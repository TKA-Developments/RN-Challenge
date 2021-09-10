import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TaskList({ item, handleDeleteTask }) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.taskContainer}>
        <Text>
          {item.value}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteTask(item.key)}
      >
          <View style={styles.deleteButton}>
            <AntDesign
              name='delete'
              style={{ fontSize: 20 }}
            />
          </View>
      </TouchableOpacity>
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
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  deleteButton: {
    width: 17,
    height: 12,
    marginRight: 15,
    justifyContent: 'center',
  },
  completeButton: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    borderRadius: 5,
    marginRight: 15,
  },
});
