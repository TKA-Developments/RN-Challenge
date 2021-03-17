import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import SplashScreen from './screens/SplashScreen';
import useInitialization from './hooks/useInitialization';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import AuthNavigator from './navigation/auth';
import { UserContext, UserProvider } from './context/UserContext';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

const Main = () => {
  const isLoading = useInitialization();

  const { user } = useContext(UserContext);
  const { choiceByTheme } = useContext(ThemeContext);

  // return <AnimationDemoScreen />;

  if (isLoading) {
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={choiceByTheme({
        dark: DarkTheme,
        light: DefaultTheme,
      })}
    >
      {user === null ? <AuthNavigator/> : <RootNavigator/>}
    </NavigationContainer>
  );
};

export default () => (
  <SafeAreaProvider>
    <UserProvider>
      <ThemeProvider>
        <Main/>
      </ThemeProvider>
    </UserProvider>
    {/* <StatusBar/> */}
  </SafeAreaProvider>
);
