import React from 'react';
import { SearchBar as DefaultSearchBar } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { useColor } from '../components/Themed';

const SearchBar: React.FC = () => {
  return (
    <DefaultSearchBar
      platform="android"
      placeholder="Search Todo..."
      containerStyle={styles.container}
      inputStyle={{ ...styles.input, color: useColor('textSecondary') }}
      inputContainerStyle={{ ...styles.inputContainer, backgroundColor: useColor('background') }}
      searchIcon={{ color: useColor('textSecondary') }}
      cancelIcon={{ color: useColor('textSecondary') }}
      clearIcon={{ color: useColor('textSecondary') }}
      placeholderTextColor={useColor('textSecondary')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '83%',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    height: 50,
    borderRadius: 10,
  },
  input: {
    fontFamily: 'nunito',
  },
});

export default SearchBar;
