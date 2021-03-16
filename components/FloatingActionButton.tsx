import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedColors, useThemeColors } from './Themed';

const styles = (color: ThemedColors) => StyleSheet.create({
  roundTouchableOpacityStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: color.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: color.primary,
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
  const themeColor = useThemeColors();
  const themedStyles = styles(themeColor);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={themedStyles.roundTouchableOpacityStyle}>
      <MaterialIcons
        style={themedStyles.iconStyle}
        name={iconName}
        size={40}
      />
    </TouchableOpacity>
  );
};
