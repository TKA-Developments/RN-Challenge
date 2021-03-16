import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import { rootNavContainerRef, RootNavigator } from './navigation';
import SplashScreen from './screens/SplashScreen';
import useInitialization from './hooks/useInitialization';
import useUserAuthentication from './hooks/useUserAuthentication';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Main = ({
  user,
  isLoading,
}:
  {
    user: FirebaseAuthTypes.User,
    isLoading: boolean,
  }) => {
  if (isLoading) {
    return <SplashScreen/>;
  }

  if (user === null) {
    return <AuthNavigator/>;
  }

  return <RootNavigator/>;
};

export default () => {
  const isLoading = useInitialization();
  const colorScheme = useColorScheme();
  const user = useUserAuthentication();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={rootNavContainerRef}
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Main isLoading={isLoading} user={user}/>
      </NavigationContainer>
      <StatusBar/>
    </SafeAreaProvider>
  );
};
