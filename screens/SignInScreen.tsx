import React from 'react';
import SigninForm from '../components/SigninForm';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
  },
});

export default () => {
  return (
    <View style={styles.containerStyle}>
      <SigninForm/>
    </View>
  );
};
