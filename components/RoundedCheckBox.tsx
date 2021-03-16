import RoundedCheckbox, { IRoundedCheckboxProps } from 'react-native-rounded-checkbox';
import React from 'react';
import { useThemeColors } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default (props: IRoundedCheckboxProps) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const propsWithDefault = {
    checkedColor: themeColors.primary,
    uncheckedColor: themeColors.tabIconDefault, // themeColors.primaryDarken
    borderColor: 'transparent',
    component: <FontAwesome
      name="check"
      size={30}
      color={themeColors.background}
    />,
    ...props,
  };

  return (
    <RoundedCheckbox
      {...propsWithDefault}
    />
  );
};
