import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TodoSearchProps {
    onSetKeywords: (taskName: string) => void
}

export default function TodoSearch(props: TodoSearchProps) {
    const [taskNameToSearch, setTaskNameToSearch] = useState('');

    const todoInputHandler = (taskName: React.SetStateAction<string>) => {
        setTaskNameToSearch(taskName);
    };
    
    const searchHandler = () => {
        props.onSetKeywords(taskNameToSearch);
        // setTaskNameToSearch('');
    };

    return (
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Enter a task name to search for.."
              placeholderTextColor={'#999'}
              onChangeText={todoInputHandler}
              value={taskNameToSearch}
              autoCorrect={false}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={searchHandler}>
              <Text style={styles.buttons}>
                <Icon name="search1" size={25} color="#2f95dc" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 5,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 14,
    marginLeft: 25,
  },
  button: {
    marginRight: 25,
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
  },
});