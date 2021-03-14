import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import { RootNavigator } from './navigation';
import SplashScreen from './screens/SplashScreen';
import useInitialization from './hooks/useInitialization';
import useAuthentication from './hooks/useUserAuthentication';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';

export default function App() {
  const isLoading = useInitialization();
  const colorScheme = useColorScheme();
  const user = useAuthentication();

  if (isLoading) {
    return <SplashScreen/>;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user === null ? <SignInScreen/> : <RootNavigator/>}
      </NavigationContainer>
      <StatusBar/>
    </SafeAreaProvider>
  );
}
