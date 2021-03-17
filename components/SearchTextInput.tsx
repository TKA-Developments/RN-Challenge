import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TextInput, TextInputProps, ThemedColors, View, } from './Themed';
import { ThemeContext } from '../context/ThemeContext';

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
  const { colors } = useContext(ThemeContext);
  const themedStyles = styles(colors);

  return (
    <View style={themedStyles.containerStyle}>
      <SimpleLineIcons name="magnifier" size={20} color={colors.primary}/>
      <TextInput placeholder="Test search" style={themedStyles.textInputStyle} {...props} />
    </View>
  );
};
