import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TaskList({ item }) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.taskContainer}>
        <Text>
          {item.value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#ffffff',
    margin: 15,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
