import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColor } from './components/Themed';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { TasksProvider } from './context/taskContext';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const statusbarColor = useColor('shadeAbove');
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TasksProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar translucent backgroundColor={statusbarColor} />
        </TasksProvider>
      </SafeAreaProvider>
    );
  }
}
