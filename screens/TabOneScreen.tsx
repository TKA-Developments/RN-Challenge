import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import TaskItems from '../components/TaskItems';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TaskItems
        containerStyle={styles.container}
        tabScreenSelect='TabOne'
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
