import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ThemedColors, useThemeColors } from './Themed';

const styles = (colors: ThemedColors) => StyleSheet.create({
  touchableStyle: {
    // margin: 20,
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default ({
  children,
  touchableStyle,
  textStyle,
  onPress,
  lightColor,
  darkColor,
}:
  {
    children?: string,
    touchableStyle?: any,
    textStyle?: any,
    onPress?: () => void,
    lightColor?: string,
    darkColor?: string,
  }) => {
  const themes = useThemeColors();
  const themedStyle = styles(themes);

  return (
    <TouchableOpacity onPress={onPress} style={[themedStyle.touchableStyle, touchableStyle]}>
      <Text style={[themedStyle.textStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
