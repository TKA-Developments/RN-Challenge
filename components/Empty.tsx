import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

let today = new Date().toISOString().slice(0, 10);

export default function Empty({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.title}>
        {today}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#e8eaed',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
