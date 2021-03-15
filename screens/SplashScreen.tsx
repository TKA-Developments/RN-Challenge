import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner, Text } from '../components/Themed';

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTextStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.loadingTextStyle}>Loading</Text>
      <Spinner/>
    </View>
  );
};
