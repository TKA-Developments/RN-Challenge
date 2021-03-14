import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default () => {
  const { colors } = useTheme();

  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={colors.primary}/>
    </View>
  );
};
