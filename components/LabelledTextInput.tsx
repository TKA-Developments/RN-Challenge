import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default (
  {
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry
  }:
    {
      label: string,
      placeholder: string,
      value: string,
      onChangeText: (text: string) => void,
      secureTextEntry?: boolean
    }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
