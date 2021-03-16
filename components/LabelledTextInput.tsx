import React from 'react';
import { StyleSheet, } from 'react-native';
import { Text, TextInput, ThemedColors, useThemeColors, View } from './Themed';

const styles = (colors: ThemedColors) => StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  textLabelStyle: {
    fontSize: 17,
  },
  textInputStyle: {
    marginVertical: 5,
    fontSize: 20,
    // borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
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
  const themedColor = useThemeColors();
  const themedStyles = styles(themedColor);

  return (
    <View {...containerProps} style={themedStyles.containerStyle}>
      <Text
        {...labelProps}
        style={themedStyles.textLabelStyle}
      >
        {label}
      </Text>
      <TextInput
        {...textInputProps}
        style={themedStyles.textInputStyle}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
