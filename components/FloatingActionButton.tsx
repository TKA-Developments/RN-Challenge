import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

const styles = (theme: Theme) => StyleSheet.create({
  modalContainerStyle: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 1,
    borderColor: theme.colors.border,
  },
  roundTouchableOpacityStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'black',
  },
});

export default ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <View style={themedStyles.modalContainerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={themedStyles.roundTouchableOpacityStyle}>
        <MaterialIcons style={themedStyles.iconStyle} size={60} name="add"/>
      </TouchableOpacity>
    </View>
  );
};
