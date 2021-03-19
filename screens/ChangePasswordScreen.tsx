import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ChangePasswordForm from '../components/ChangePasswordForm';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
  },
});

export default () => (
  <View style={styles.containerStyle}>
    <ChangePasswordForm />
  </View>
);
