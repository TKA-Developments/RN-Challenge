import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

// export type onAddTodo = (text: string) => any;
interface TodoInsertProps {
    // onSetShowCompleted: (status: boolean) => void,
    // onSetShowAll: (status: boolean) => void
    onSetFilterCode: (code: number) => void
}

export default function TodoInsert(props: TodoInsertProps) {
    const [newTodoItem, setNewTodoItem] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const todoInputHandler = (newTodo: React.SetStateAction<string>) => {
        setNewTodoItem(newTodo);
    };

    const handleIndexChange = (index: number) => {
        console.log(index.toString());
        setSelectedIndex(index);
        props.onSetFilterCode(index);
        // switch(index){
        //     case 0:
        //         props.onSetShowAll(true);
        //         break;
        //     case 1:
        //         props.onSetShowAll(false);
        //         props.onSetShowCompleted(false);
        //         break;
        //     case 3:
        //         props.onSetShowAll(false);
        //         props.onSetShowCompleted(true);
        //         break;
        //     default:
        //         props.onSetShowAll(true);
        // }
    };

    // const addTodoHandler = () => {
    //     props.onAddTodo(newTodoItem);
    //     setNewTodoItem('');
    // };

    return (
        <View style={styles.container}>
            <SegmentedControlTab
                values={["All", "To do", "Completed"]}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Search some today task.."
                placeholderTextColor={'#999'}
                onChangeText={todoInputHandler}
                value={newTodoItem}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
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
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});