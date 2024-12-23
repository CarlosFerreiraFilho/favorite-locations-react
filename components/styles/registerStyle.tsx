import { ColorsConstants } from '@/styles/Global.style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsConstants.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    registerButton: {
        width: '100%',
        padding: 15,
        backgroundColor: ColorsConstants.greenTheme,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#C6FFF6',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        color: '#666',
    },
    loginButton: {
        color: '#007bff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingRight: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 15,
    },
});
