import { Tabs } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Layout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');

            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const updatedUsers = users.map(user => ({ ...user, logado: false }));

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('logado', 'false');

            router.replace('/');

            Alert.alert("Logout", "Você foi desconectado!");
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar deslogar.");
        }
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#00d6c5',
                tabBarInactiveTintColor: '#a9a9a9',
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    headerStyle: {
                        backgroundColor: '#00d6c5',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: "Home",
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Icon name="sign-out" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map/index"
                options={{
                    headerStyle: {
                        backgroundColor: '#00d6c5',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: "Mapa",
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Icon name="sign-out" size={25} color="#fff" />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
