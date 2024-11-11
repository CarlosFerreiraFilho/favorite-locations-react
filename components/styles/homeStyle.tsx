import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    locationList: {
        marginBottom: 80,
    },
    locationItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    markerIcon: {
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        marginBottom: 15,
    },
    locationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    removeButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00d6c5',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    floatingButtonText: {
        fontSize: 30,
        color: '#fff',
    },

});
