import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../../../../components/styles/homeStyle';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { CURRENT_USER, TB_LOCATIONS_NAME } from '@/Database/AppDatabase';
import LocationBodyModel from '@/models/Locations/LocationBodyModel';
import { UserContext } from '@/store/UserStore';
import env from '@/constants/env';

export default function HomeScreen() {
    const userAuth = useContext(UserContext);
    const db = useSQLiteContext();
    const [locations, setLocations] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const getLocations = async () => {
        setLoading(true)
        // const locationsData = await db.getAllAsync(`SELECT * FROM ${TB_LOCATIONS_NAME} WHERE user_id = ?`, userAuth?.id ?? 0);
        // const locationsData = await AsyncStorage.getItem('locations');

        try {
            const response = await fetch(`${env.DB_URL}/locations.json`);
            const locationsObj = await response.json();
            const locationsArr: Array<LocationBodyModel> = Object.values(locationsObj)
            const locationsIdArr: Array<string> = Object.keys(locationsObj)
            const locationsData = locationsArr.map((location_, index) => {
                return {
                    ...location_,
                    id: locationsIdArr[index]
                }
            })
            console.log(locationsData)
            setMessage(null)
            return locationsData;
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadLocations = async () => {
                const savedLocations = await getLocations();
                setLocations(savedLocations);
            };

            loadLocations();

            return () => { };
        }, [])
    );

    const handleEditLocation = (location: LocationBodyModel) => {
        router.push(`/(private)/location/${location.id}`);
        // router.push({
        //     pathname: '/(private)/location',
        //     params: { locationId: location.id },
        // });

    };

    const handleDeleteLocation = async (id) => {

        setLoading(true)
        try {

            fetch(`${env.DB_URL}/locations/${id}.json`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            })
            Alert.alert('Sucesso', 'Localização removida com sucesso!');

            setMessage(null)

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover localização!');
            setMessage(error.message)
        } finally {
            const savedLocations = await getLocations();
            setLocations(savedLocations);
            setLoading(false)
        }

        /*
        try {
            await db.runAsync(`delete from ${TB_LOCATIONS_NAME} where id = ?`, id)

            const savedLocations = await getLocations();
            setLocations(savedLocations);
            Alert.alert('Sucesso', 'Localização removida com sucesso!');
        } catch (error) {

            console.error('Não foi possível remover localização! ', error)
            Alert.alert('Erro', 'Não foi possível remover localização!');
        }

        // const updatedLocations = locations.filter(location => location.id !== id);
        // setLocations(updatedLocations);

        // await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));

        // Alert.alert('Sucesso', 'Localização removida com sucesso!');
        */
    };

    const renderLocationItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.locationItem}
                onPress={() => handleEditLocation(item)}
            >
                <View style={styles.iconContainer}>
                    <Icon
                        name="map-pin"
                        size={30}
                        color={item.markerColor}
                        style={styles.markerIcon}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationInfo}>Latitude: {item.latitude}</Text>
                    <Text style={styles.locationInfo}>Longitude: {item.longitude}</Text>
                </View>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleDeleteLocation(item.id)}
                >
                    <Icon name="trash-o" size={25} color="#fff" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" color="#00d6c5" />}
            {message && <Text>{message}</Text>}

            <FlatList
                data={locations}
                renderItem={renderLocationItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.locationList}
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => handleEditLocation({})}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
