import * as React from 'react';
import { useContext } from 'react';
import {
  ActivityIndicator,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
} from 'react-native';
import Colors from '../constants/Colors';
import { ThemeContext } from '../context/ThemeContext';

export type ThemedColors = typeof Colors.dark & typeof Colors.light;
export type ThemedColorChoice = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemedColorChoice,
) {
  const { theme } = useContext(ThemeContext);
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

export function useThemeColors() {
  const { theme } = useContext(ThemeContext);
  return Colors[theme];
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type TextProps = ThemeProps & DefaultText['props'];

export const Text = (props: TextProps) => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;

  const { getColorCustomOrThemeDefault } = useContext(ThemeContext);

  const color = getColorCustomOrThemeDefault({
    light: lightColor,
    dark: darkColor,
  }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export type ColorState = 'danger' | 'primary' | 'secondary' | 'success' | 'warning' | 'info';

type ViewProps = ThemeProps &
  DefaultView['props'] &
  { colorState?: ColorState };

export const View = (props: ViewProps) => {
  const {
    style,
    lightColor,
    darkColor,
    colorState,
    ...otherProps
  } = props;

  const { getColorCustomOrThemeDefault } = useContext(ThemeContext);

  const backgroundColor = getColorCustomOrThemeDefault({
      light: lightColor,
      dark: darkColor,
    },
    colorState as keyof typeof Colors.light & keyof typeof Colors.dark ?? 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

type SpinnerProps = ThemeProps & ActivityIndicator['props'];

export const Spinner = (props: SpinnerProps) => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;

  const { getColorCustomOrThemeDefault } = useContext(ThemeContext);

  const color = getColorCustomOrThemeDefault({
    light: lightColor,
    dark: darkColor,
  }, 'primary');

  return (
    <ActivityIndicator color={color} {...otherProps} />
  );
};

export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export const TextInput = (props: TextInputProps) => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;

  const { getColorCustomOrThemeDefault } = useContext(ThemeContext);

  const placeholderTextColor = getColorCustomOrThemeDefault({
    light: lightColor,
    dark: darkColor,
  }, 'secondary');
  const color = getColorCustomOrThemeDefault({
    light: lightColor,
    dark: darkColor,
  }, 'text');
  const backgroundColor = getColorCustomOrThemeDefault({
    light: lightColor,
    dark: darkColor,
  }, 'background');

  return (
    <DefaultTextInput
      style={[{
        color,
        backgroundColor,
      }, style]}
      placeholderTextColor={placeholderTextColor}
      {...otherProps}
    />
  );
};
