import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  butttonStyle: {
    borderRadius: 70,
  }
});

export default () => {
  return (
    <View>
      <TouchableOpacity style={styles.butttonStyle}>
        <MaterialIcons name="filter-alt"/>
        <Text>Filter by</Text>
      </TouchableOpacity>
    </View>
  );
};
