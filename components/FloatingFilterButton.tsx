import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FilterToDos, filterToString, nextFilter } from '../action/ToDos';
import { Text, View } from '../components/Themed';

const styles = StyleSheet.create({
  touchableStyle: {
    borderRadius: 70,
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

export default ({
  filterBy,
  setFilterBy
}: { filterBy: FilterToDos, setFilterBy: React.Dispatch<FilterToDos> }) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => setFilterBy(nextFilter(filterBy))}
      >
        <MaterialIcons name="filter-alt" size={20}/>
        <Text>
          Filter by
          {' '}
          {filterToString(filterBy)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
