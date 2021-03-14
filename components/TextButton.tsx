import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default ({
  children,
  touchableStyle,
  textStyle,
  onPress
}:
  {
    children?: string,
    touchableStyle?: any,
    textStyle?: any,
    onPress?: () => void,
  }) => {
  return (
    <TouchableOpacity onPress={onPress} style={touchableStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
