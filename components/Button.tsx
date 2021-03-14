import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const style = StyleSheet.create({
  pressableStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#007bff',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default ({
  children,
  touchableProps,
  textProps,
  onPress,
}:
  {
    children: string,
    onPress?: TouchableOpacity['props']['onPress'],
    touchableProps?: TouchableOpacity['props'],
    textProps?: Text['props'],
  }) => (
  <TouchableOpacity {...touchableProps} onPress={onPress} style={style.pressableStyle}>
    <Text {...textProps} style={style.textStyle}>{children}</Text>
  </TouchableOpacity>
);
