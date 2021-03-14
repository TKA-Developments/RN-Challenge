import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const style = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#007bff',
    borderWidth: 2,
  }
});

export default ({
  children,
  onPress
}:
  {
    children: string,
    onPress?: (event: GestureResponderEvent) => void
  }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style.buttonStyle}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
