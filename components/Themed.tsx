import * as React from 'react';
import {
  ActivityIndicator,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export type ThemedColors = typeof Colors.dark & typeof Colors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useThemeColors() {
  const theme = useColorScheme();
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
  const color = useThemeColor({
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
  const backgroundColor = useThemeColor({
      light: lightColor,
      dark: darkColor
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
  const color = useThemeColor({
    light: lightColor,
    dark: darkColor,
  }, 'primary');

  return (
    <ActivityIndicator color={color} {...otherProps}/>
  );
};

type TextInputProps = ThemeProps & DefaultTextInput['props'];

export const TextInput = (props: TextInputProps) => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const placeholderTextColor = useThemeColor({
    light: lightColor,
    dark: darkColor,
  }, 'secondary');
  const color = useThemeColor({
    light: lightColor,
    dark: darkColor,
  }, 'text');
  const backgroundColor = useThemeColor({
    light: lightColor,
    dark: darkColor,
  }, 'background');

  return (
    <DefaultTextInput
      style={[{
        color,
        backgroundColor
      }, style]}
      placeholderTextColor={placeholderTextColor}
      {...otherProps}
    />
  );
};
