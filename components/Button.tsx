import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemedColors, useThemeColors } from './Themed';

const styles = (color: ThemedColors) => StyleSheet.create({
  pressableStyle: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    backgroundColor: color.primary,
  },
  pressableDisabledStyle: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    backgroundColor: color.primaryDarken,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: color.text,
    backgroundColor: 'transparent',
  },
});

export default ({
  children,
  touchableProps,
  textProps,
  onPress,
  disabled,
}:
  {
    children: string,
    onPress?: TouchableOpacity['props']['onPress'],
    touchableProps?: TouchableOpacity['props'],
    textProps?: Text['props'],
    disabled?: boolean,
  }) => {
  const themedColors = useThemeColors();
  const themedStyle = styles(themedColors);

  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={disabled ? undefined : onPress}
      style={disabled ? themedStyle.pressableDisabledStyle : themedStyle.pressableStyle}
      activeOpacity={disabled ? 1 : 0.2}
    >
      <Text {...textProps} style={themedStyle.textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
