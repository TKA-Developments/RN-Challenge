import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, ThemedColors, useThemeColors } from './Themed';

const styles = (color: ThemedColors) => StyleSheet.create({
  textInputStyle: {
    backgroundColor: color.textInput,
    paddingHorizontal: 10,
  },
});

export default () => {
  const colors = useThemeColors();
  const themedStyles = styles(colors);

  return (
    <TextInput placeholder="Test search" style={themedStyles.textInputStyle}/>
  );
}
