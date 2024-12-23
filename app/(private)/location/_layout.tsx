import { ColorsConstants } from '@/styles/Global.style';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: ColorsConstants.greenTheme,
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
