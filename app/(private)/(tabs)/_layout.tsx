import { Tabs } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ColorsConstants } from '@/styles/Global.style';
import { useSQLiteContext } from 'expo-sqlite';
import UserBodyModel from '@/models/Users/UserBodyModel';
import { SELECT_USER_LOGGED, TB_USERS_NAME } from '@/Database/AppDatabase';

export default function Layout() {
    const router = useRouter();
    const db = useSQLiteContext();

    const handleLogout = async () => {
        try {

            const loggedInUser = await db.getFirstAsync<UserBodyModel>(SELECT_USER_LOGGED);

            if (loggedInUser) {
                await db.runAsync(`UPDATE ${TB_USERS_NAME} SET logado = 0, updated_at = ? where id = ?`, Date(), loggedInUser.id);
            }

            // await AsyncStorage.removeItem('user');

            // const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            // const updatedUsers = users.map(user => ({ ...user, logado: false }));

            // await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            // await AsyncStorage.setItem('logado', 'false');

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
                tabBarActiveTintColor: ColorsConstants.greenTheme,
                tabBarInactiveTintColor: '#a9a9a9',
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    headerStyle: {
                        backgroundColor: ColorsConstants.greenTheme,
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
                        backgroundColor: ColorsConstants.greenTheme,
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
