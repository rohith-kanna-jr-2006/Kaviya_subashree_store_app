import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import App from '../App';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        // Hide the splash screen after a short delay to ensure everything is rendered
        SplashScreen.hideAsync();
    }, []);

    return <App />;
}
