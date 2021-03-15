import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import DatePicker from 'react-native-datepicker';
import { TodoContext } from '../contexts/TodoContext';

import { Text, View } from '../components/Themed';

const AddTodoScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'AddTodo'>) => {
    const [title, setTitle] = useState<string>('');
    let today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })).toISOString().slice(0, 10);
    const [date, setDate] = useState<string>(today);
    const { addTodo } = useContext(TodoContext);

    const onPress = () => {
        // Select Category akan diterapkan menyusul
        if (date && title) {
            addTodo(title, date, 'academic');
            navigation.pop();
        } else {
            // Nanti akan dibuat warning
            console.log('Fill first!');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="What are you planning?"
            />
            <View style={styles.buttonGroup}>
                <DatePicker
                    style={styles.dateButton}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={today}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date: string) => { setDate(date) }}
                />
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Text style={styles.addText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1,
    },
    input: {
        height: 200,
        borderWidth: 1,
        backgroundColor: 'white',
        flex: 0.7,
    },
    buttonGroup: {
        flex: 0.3
    },
    dateButton: {
        width: '100%',
        backgroundColor: 'white'
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryText: {
        textAlign: 'center'
    },
    addButton: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: 'black'
    }
});

export default AddTodoScreen;