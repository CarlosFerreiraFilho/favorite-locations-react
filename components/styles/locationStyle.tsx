import { ColorsConstants } from '@/styles/Global.style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsConstants.backgroundColor,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 0,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    inputError: {
        borderColor: '#ff3333',
        borderWidth: 2,
    },
    errorText: {
        color: '#ff3333',
        fontSize: 12,
    },
    saveButton: {
        width: '100%',
        padding: 15,
        backgroundColor: ColorsConstants.greenTheme,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0',
    },
    removeButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#ff6666',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
