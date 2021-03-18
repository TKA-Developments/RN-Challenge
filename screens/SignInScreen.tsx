import React from 'react';
import { StyleSheet } from 'react-native';
import SigninForm from '../components/SignInForm';
import { View } from '../components/Themed';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
  },
});

export default () => (
  <View style={styles.containerStyle}>
    <SigninForm/>
  </View>
);
