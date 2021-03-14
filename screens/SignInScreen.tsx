import React from 'react';
import SigninForm from '../components/SigninForm';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

export default () => {
  return (
    <View style={styles.containerStyle}>
      <SigninForm/>
    </View>
  );
};
