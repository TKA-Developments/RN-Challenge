import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedColors, useThemeColors } from './Themed';

const styles = (colors: ThemedColors) => StyleSheet.create({
  roundTouchableOpacityStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  iconStyle: {
    color: colors.primary,
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
