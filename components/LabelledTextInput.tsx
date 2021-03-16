import React from 'react';
import { StyleSheet, } from 'react-native';
import { Text, TextInput, View } from './Themed';

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  textLabelStyle: {
    fontSize: 17,
  },
  textInputStyle: {
    marginVertical: 5,
    fontSize: 20,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default (
  {
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    containerProps,
    textInputProps,
    labelProps,
  }:
    {
      label?: string,
      placeholder: string,
      value: string,
      onChangeText: (text: string) => void,
      secureTextEntry?: boolean,
      containerProps?: typeof View['props'],
      textInputProps?: typeof TextInput['props'],
      labelProps?: Text['props'],
    }) => {
  return (
    <View {...containerProps} style={styles.containerStyle}>
      <Text
        {...labelProps}
        style={styles.textLabelStyle}
      >{label}</Text>
      <TextInput
        {...textInputProps}
        style={styles.textInputStyle}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
