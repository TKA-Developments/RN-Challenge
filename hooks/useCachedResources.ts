import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'poppins': require('../assets/fonts/Poppins-Regular.ttf'),
          'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'poppins-thin': require('../assets/fonts/Poppins-Thin.ttf'),
          'poppins-light': require('../assets/fonts/Poppins-Light.ttf'),
          'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
