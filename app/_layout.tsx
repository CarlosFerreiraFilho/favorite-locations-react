import { DATABASE_NAME, migrateDB } from '@/Database/AppDatabase';
import UserProvider from '@/store/UserStore';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

export default function Layout() {
    return (
        <UserProvider>
            <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDB}>
                <Stack
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="register" options={{}} />
                </Stack>
            </SQLiteProvider>
        </UserProvider>
    );
}
