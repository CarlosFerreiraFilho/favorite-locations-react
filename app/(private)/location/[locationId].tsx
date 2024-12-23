import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../../../components/styles/locationStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { TB_LOCATIONS_NAME } from '@/Database/AppDatabase';
import LocationBodyModel from '@/models/Locations/LocationBodyModel';
import { UserContext } from '@/store/UserStore';
import env from '@/constants/env';

export default function LocationScreen() {
  const userAuth = useContext(UserContext);
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { locationId } = useLocalSearchParams();

  console.log("ID recebido: ", locationId);

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [markerColor, setMarkerColor] = useState('#000000');
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (locationId && locationId !== "undefined") {
      const fetchLocationData = async () => {

        setLoading(true)
        /*
        // const locations = await AsyncStorage.getItem('locations');
        // const parsedLocations = locations ? JSON.parse(locations) : [];

        // const location = parsedLocations.find(loc => loc.id === locationId);
        // // const location = await db.getFirstAsync<LocationBodyModel>(`SELECT * FROM ${TB_LOCATIONS_NAME} WHERE id = ?`, locationId);
        */

        try {
          const response = await fetch(`${env.DB_URL}/locations/${locationId}.json`);
          const location = await response.json();

          if (location) {
            setName(location.name);
            setLatitude(location.latitude);
            setLongitude(location.longitude);
            setMarkerColor(location.markerColor);
          }
          setMessage(null)
        } catch (error) {
          setMessage(error.message)
        } finally {
          setLoading(false)
        }
      };
      fetchLocationData();
    }
  }, [locationId]);

  const getLocations = async () => {
    const locations = await AsyncStorage.getItem('locations');
    const parsedLocations = locations ? JSON.parse(locations) : [];
    console.log('Localizações armazenadas:', parsedLocations);
    return parsedLocations;
  };

  const saveLocations = async () => {
    const userUid = userAuth?.id
    try {

      if (locationId && locationId !== "undefined") {

        fetch(`${env.DB_URL}/locations/${locationId}.json`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, latitude, longitude, markerColor, userUid, updated_at: Date()
          })
        })


        /*
        await db.runAsync(`UPDATE ${TB_LOCATIONS_NAME} SET name = ?,
                                                        latitude = ?,
                                                        longitude = ?,
                                                        markerColor = ?,
                                                        updated_at = ?
                                          where id = ?`, name, latitude, longitude, markerColor, Date(), locationId)
      */
      } else {


        fetch(`${env.DB_URL}/locations.json`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, latitude, longitude, markerColor, userUid, created_at: Date(), updated_at: null
          })
        })

        /*await db.runAsync(`INSERT INTO ${TB_LOCATIONS_NAME} (name,
                                      latitude,
                                      longitude,
                                      markerColor,
                                      user_id,
                                      created_at,
                                      updated_at)
                              VALUES (?, ?, ?, ?, ?, ?,?)`, name, latitude, longitude, markerColor, userAuth?.id ?? 0, Date(), Date())
*/
      }
      // console.log("locations:" + locations)
      // await AsyncStorage.setItem('locations', JSON.stringify(locations));
    } catch (error) {
      console.error('Erro ao salvar localizações no AsyncStorage:', error);
    }
  };

  const handleSave = async () => {
    if (validateFields()) {

      /* 
      // const newLocation = { name, latitude, longitude, markerColor };

      // const locations = await getLocations();

      // if (locationId && locationId !== "undefined") {
      //   const updatedLocations = locations.map(location =>
      //     location.id === locationId ? { ...newLocation, id: locationId } : location
      //   );
      //   await saveLocations(updatedLocations);
      // } else {
      //   console.log(CURRENT_USER.user_id)

      // newLocation.id = new Date().getTime().toString();
      // locations.push(newLocation);
      // await saveLocations(locations);
      */

      await saveLocations();
      // }

      Alert.alert('Sucesso', 'Localização salva com sucesso!');
      navigation.goBack();
    }
  };

  const handleRemove = async () => {

    try {

      fetch(`${env.DB_URL}/locations/${locationId}.json`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      })
      Alert.alert('Sucesso', 'Localização removida com sucesso!');

      navigation.goBack();
      setMessage(null)

    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }


    // const locations = await getLocations();
    // const updatedLocations = locations.filter(location => location.id !== locationId);
    // await saveLocations(updatedLocations);
    // 
    // await db.runAsync(`delete from ${TB_LOCATIONS_NAME} where id = ?`, locationId)

  };

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!latitude || isNaN(latitude)) newErrors.latitude = 'Latitude inválida';
    if (!longitude || isNaN(longitude)) newErrors.longitude = 'Longitude inválida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização não concedida!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#00d6c5" />}
      {message && <Text>{message}</Text>}
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nome da Localização"
        placeholderTextColor="#a9a9a9"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors({ ...errors, name: '' });
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.latitude && styles.inputError]}
        placeholder="Latitude"
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
        value={latitude}
        onChangeText={(text) => {
          setLatitude(text);
          setErrors({ ...errors, latitude: '' });
        }}
      />
      {errors.latitude && <Text style={styles.errorText}>{errors.latitude}</Text>}

      <TextInput
        style={[styles.input, errors.longitude && styles.inputError]}
        placeholder="Longitude"
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
        value={longitude}
        onChangeText={(text) => {
          setLongitude(text);
          setErrors({ ...errors, longitude: '' });
        }}
      />
      {errors.longitude && <Text style={styles.errorText}>{errors.longitude}</Text>}

      <TextInput
        style={[styles.input, errors.markerColor && styles.inputError]}
        placeholder="Cor do Marcador (ex: #ff0000)"
        placeholderTextColor="#a9a9a9"
        value={markerColor}
        onChangeText={(text) => {
          setMarkerColor(text);
          setErrors({ ...errors, markerColor: '' });
        }}
      />
      {errors.markerColor && <Text style={styles.errorText}>{errors.markerColor}</Text>}

      <TouchableOpacity
        onPress={getCurrentLocation}
        style={styles.getLocationButton}
      >
        <Text style={styles.getLocationButtonText}>Usar Localização Atual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveButton, (!name || !latitude || !longitude || !markerColor) && styles.disabledButton]}
        disabled={!name || !latitude || !longitude || !markerColor}
      >
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      {locationId && locationId !== "undefined" && (
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}