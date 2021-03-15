import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const styles = (theme: Theme) => StyleSheet.create({
  roundTouchableOpacityStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'black',
  },
});

export default ({
  onPress,
  iconName
}:
  {
    onPress: () => void,
    iconName: any,
  }) => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={themedStyles.roundTouchableOpacityStyle}>
      <MaterialIcons style={themedStyles.iconStyle} name={iconName} size={40}/>
    </TouchableOpacity>
  );
};
