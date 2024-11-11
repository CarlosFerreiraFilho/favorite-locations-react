import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#00d6c5',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="[locationId]"
                options={{
                    title: "Adicionar localização",
                }}
            />
        </Stack>
    );
}
Layout.routeName = "location";
