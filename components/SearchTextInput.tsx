import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TextInputProps, ThemedColors, useThemeColors, View } from './Themed';
import { SimpleLineIcons } from '@expo/vector-icons';

const styles = (color: ThemedColors) => StyleSheet.create({
  textInputStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingLeft: 10,
  },
  iconStyle: {
    // justifyContent: 'center',
  },
  containerStyle: {
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: color.textInput,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default (props: TextInputProps) => {
  const colors = useThemeColors();
  const themedStyles = styles(colors);

  return (
    <View style={themedStyles.containerStyle}>
      <SimpleLineIcons name="magnifier" size={20}/>
      <TextInput placeholder="Test search" style={themedStyles.textInputStyle} {...props}/>
    </View>
  );
}
