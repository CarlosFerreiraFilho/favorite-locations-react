import { ColorsConstants, FontConstants } from '@/styles/Global.style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    locationList: {
        marginBottom: 80,
    },
    locationItem: {
        backgroundColor: ColorsConstants.locationContainer,
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: FontConstants.color,
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
        color: FontConstants.titleLabel,
    },
    locationInfo: {
        fontWeight: 'bold',
        color: FontConstants.titleLabel,
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
        backgroundColor: ColorsConstants.greenTheme,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: FontConstants.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    floatingButtonText: {
        fontSize: 30,
        color: '#fff',
    },

});
