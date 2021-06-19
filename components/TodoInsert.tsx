import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert} from 'react-native';

// export type onAddTodo = (text: string) => any;
interface TodoInsertProps {
  onAddTodo: (text: string) => void
}

export default function TodoInsert(props: TodoInsertProps) {
    const [newTodoItem, setNewTodoItem] = useState('');

    const todoInputHandler = (newTodo: React.SetStateAction<string>) => {
        setNewTodoItem(newTodo);
    };
    
    const addTodoHandler = () => {
        props.onAddTodo(newTodoItem);
        setNewTodoItem('');
    };

    return (
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="What to do today?"
              placeholderTextColor={'#999'}
              onChangeText={todoInputHandler}
              value={newTodoItem}
              autoCorrect={false}
          />
          <View style={styles.button}>
              <Button 
                  onPress={addTodoHandler}
                  title={'ADD'} />
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
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 18,
    marginLeft: 25,
  },
  button: {
    marginRight: 25,
    marginLeft: 10
  },
});