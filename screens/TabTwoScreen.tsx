import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import TaskItems from '../components/TaskItems.tsx'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <TaskItems
        containerStyle={styles.container}
        tabScreenSelect='TabTwo'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
});
