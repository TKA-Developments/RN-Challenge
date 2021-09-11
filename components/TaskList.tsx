import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TaskList({ item, completed, handleDeleteTask }) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.taskContainer}>
        { completed == false ?
          <View style={styles.completeButton}>
            <AntDesign
              name='right'
              style={{ fontSize: 25, color: '#171717' }}
            />
          </View> :
          <View style={styles.completeButton}>
            <AntDesign
              name='check'
              style={{ fontSize: 25, color: '#006f00' }}
            />
          </View>
        }
        { completed == false ?
          <Text>
            {item.value}
          </Text> :
          <Text style={{ textDecorationLine: 'line-through' }}>
            {item.value}
          </Text>
        }
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteTask(item.key)}
      >
          <View style={styles.deleteButton}>
            <AntDesign
              name='delete'
              style={{ fontSize: 25, color: '#9b1300' }}
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
    width: 25,
    height: 25,
    marginRight: 20,
    justifyContent: 'center',
  },
  completeButton: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});
