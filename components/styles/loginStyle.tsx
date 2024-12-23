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
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 15,
        paddingRight: 10,
    },
    inputPassword: {
        flex: 1,
        padding: 15,
        color: '#333',
    },
    loginButton: {
        width: '100%',
        padding: 15,
        backgroundColor: ColorsConstants.greenTheme,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#007bff',
        marginTop: 10,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        color: '#666',
    },
    registerButton: {
        color: '#007bff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
