import React, { createContext } from 'react';
import Colors from '../constants/Colors';
import { ThemedColorChoice } from '../components/Themed';
import { ReactChildrenComponent } from '../types';
import useTheme, { ThemeData } from '../hooks/useTheme';

type Choice = { light: any, dark: any };
type ChoiceColorOptional = Partial<{ light: string, dark: string }>;

type ThemeContextData = {
  theme: ThemeData,
  setTheme: React.Dispatch<React.SetStateAction<ThemeContextData['theme']>>,
  colors: typeof Colors.light | typeof Colors.dark,
  choiceByTheme: (choice: Choice) => any,
  getColorCustomOrThemeDefault: (choice: ChoiceColorOptional, key: ThemedColorChoice) => string,
};

export const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  setTheme: (_) => {
  },
  colors: Colors.light,
  choiceByTheme: (choice: Choice) => choice.light,
  getColorCustomOrThemeDefault: (choice: ChoiceColorOptional, key: ThemedColorChoice) => '',
});

export const ThemeProvider = ({ children }: { children: ReactChildrenComponent }) => {
  const [theme, setTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      colors: theme === 'light' ? Colors.light : Colors.dark,
      choiceByTheme: (choice: Choice) => (theme === 'light' ? choice.light : choice.dark),
      getColorCustomOrThemeDefault: (choice: ChoiceColorOptional, key: ThemedColorChoice) => (theme === 'light' ? (choice.light ?? Colors.light[key]) : (choice.dark ?? Colors.dark[key])),
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
