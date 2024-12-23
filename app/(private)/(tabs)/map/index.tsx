import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { CURRENT_USER, TB_LOCATIONS_NAME } from '@/Database/AppDatabase';
import { useSQLiteContext } from 'expo-sqlite';
import LocationBodyModel from '@/models/Locations/LocationBodyModel';

export default function MapScreen() {
    const db = useSQLiteContext();
    const [region, setRegion] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadLocations = async () => {
                // const locationsData = await AsyncStorage.getItem('locations');
                // const locations = locationsData ? JSON.parse(locationsData) : [];

                const locations = await db.getAllAsync(`SELECT * FROM ${TB_LOCATIONS_NAME} WHERE user_id = ?`, CURRENT_USER.user_id);

                setSavedLocations(locations);

                if (locations.length > 0) {
                    const lastLocation = locations[locations.length - 1];
                    setRegion({
                        latitude: parseFloat(lastLocation.latitude),
                        longitude: parseFloat(lastLocation.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            };

            loadLocations();
        }, [])
    );

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);
            if (status !== 'granted') {
                Alert.alert('Permissão de localização não concedida!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            if (!region) {
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        };

        if (!region) {
            getLocation();
        }
    }, [region]);

    useEffect(() => {
        if (savedLocations.length > 0 && region) {
            const coordinates = savedLocations.map(location => ({
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
            }));

            setTimeout(() => {
                mapRef.current?.fitToCoordinates(coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                });
            }, 500);
        }
    }, [savedLocations, region]);



    const handleEditLocation = (location: LocationBodyModel) => {
        router.push(`/(private)/location/${location.id}`);
    };

    const mapRef = React.createRef();

    if (!region) {
        return (
            <View style={styles.container}>
                <Text>Carregando localização...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                showsUserLocation={true}
            >
                <Marker coordinate={region} title="Minha localização" />

                {savedLocations.map((location: LocationBodyModel) => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: parseFloat(location.latitude),
                            longitude: parseFloat(location.longitude),
                        }}
                        title={location.name}
                        pinColor={location.markerColor}
                        onPress={() => handleEditLocation(location)}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
