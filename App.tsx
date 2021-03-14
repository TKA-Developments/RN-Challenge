import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import SplashScreen from './screens/SplashScreen';
import useInitialization from './hooks/useInitialization';

export default function App() {
  const isLoading = useInitialization();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return <SplashScreen/>;
  }
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme}/>
      <StatusBar/>
    </SafeAreaProvider>
  );
}
