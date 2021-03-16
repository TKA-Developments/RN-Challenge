import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import useCachedResources from '../hooks/useCachedResources';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextBold(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins-bold';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextThin(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins-thin';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextLight(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins-light';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextMedium(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins-medium';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function TextSemiBold(props: TextProps) {
  const isLoadingComplete = useCachedResources();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const fontFamily = 'poppins-semibold';

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
