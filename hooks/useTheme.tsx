import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from './useColorScheme';

export type ThemeData = ReturnType<typeof useColorScheme>;

export default (): [
  ThemeData,
  React.Dispatch<React.SetStateAction<ThemeData>>,
] => {
  const [theme, setTheme] = useState<ThemeData>(useColorScheme());

  useEffect(() => {
    // Don't really care about error, because we have default value as fallback
    AsyncStorage.getItem('theme')
      .then((theme_) => {
        if (theme_ === null) {
          setTheme(useColorScheme());
        } else {
          setTheme(theme_ as ThemeData);
        }
      })
      .catch((reason) => {
        console.error(`Error on getting theme: ${reason}`);
      });
  }, []);

  useEffect(() => {
    // Don't really care about error, because we have default value as fallback
    AsyncStorage.setItem('theme', theme)
      .catch((reason) => {
        console.error(`Error on setting theme: ${reason}`);
      });
  }, [theme]);

  return [theme, setTheme];
};
