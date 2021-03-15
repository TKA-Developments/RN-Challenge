import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FilterToDos, filterToString, nextFilter } from '../action/ToDos';
import { Text, ThemedColors, useThemeColors, View } from '../components/Themed';

const styles = (colors: ThemedColors) => StyleSheet.create({
  touchableStyle: {
    borderRadius: 70,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
});

export default ({
  filterBy,
  setFilterBy,
}: { filterBy: FilterToDos, setFilterBy: React.Dispatch<FilterToDos> }) => {
  const themes = useThemeColors();
  const themedStyle = styles(themes);

  return (
    <View style={themedStyle.containerStyle}>
      <TouchableOpacity
        style={themedStyle.touchableStyle}
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
