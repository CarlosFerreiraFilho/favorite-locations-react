import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../../../../components/styles/homeStyle';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
        const locationsData = await AsyncStorage.getItem('locations');
        return locationsData ? JSON.parse(locationsData) : [];
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

    const handleEditLocation = (location) => {
        router.push(`/(private)/location/${location.id}`);
        // router.push({
        //     pathname: '/(private)/location',
        //     params: { locationId: location.id },
        // });

    };

    const handleDeleteLocation = async (id) => {
        const updatedLocations = locations.filter(location => location.id !== id);
        setLocations(updatedLocations);

        await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));

        Alert.alert('Sucesso', 'Localização removida com sucesso!');
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
                    <Text>Latitude: {item.latitude}</Text>
                    <Text>Longitude: {item.longitude}</Text>
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
