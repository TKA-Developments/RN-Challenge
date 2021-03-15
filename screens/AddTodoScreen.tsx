import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import DatePicker from 'react-native-datepicker';
import { TodoContext } from '../contexts/TodoContext';
import { Overlay } from 'react-native-elements';
import { RadioButton, Divider } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';

import { Text, View } from '../components/Themed';
import { setStatusBarHidden } from 'expo-status-bar';

const AddTodoScreen = ({ navigation, route }: StackScreenProps<RootStackParamList, 'AddTodo'>) => {
    let today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })).toISOString().slice(0, 10);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [date, setDate] = useState<string>(today);
    const { addTodo, updateTodo, categories } = useContext(TodoContext);
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (route.params) {
            setTitle(route.params.title);
            setDate(route.params.date);
            setCategory(route.params.category);
        }
    }, []);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    }

    const selectCategory = (categoryTitle: string) => {
        setCategory(categoryTitle);
        setOverlayVisible(false);
    }

    const onSubmit = async () => {
        // Select Category akan diterapkan menyusul
        if (date && title && category) {
            if (!route.params) {
                await addTodo(title, date, category);
            } else {
                await updateTodo({
                    ...route.params,
                    title: title,
                    date: date,
                    category: category,
                });
            }
            navigation.popToTop();
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
                <TouchableOpacity style={styles.categoryButton} onPress={toggleOverlay}>
                    <Text style={styles.categoryText}>{category ? category : 'Category'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={onSubmit}>
                    <Text style={styles.addText}>{route.params ? 'Edit Task' : 'Add Task'}</Text>
                </TouchableOpacity>
            </View>
            <Overlay overlayStyle={{ backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }} isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
                {categories.map(cat => (
                    <TouchableOpacity style={styles.radioContainer} onPress={() => selectCategory(cat.title)}>
                        <RadioButton
                            key={cat.title}
                            value={cat.title}
                            uncheckedColor={cat.color}
                            color={cat.color}
                            status={category === cat.title ? 'checked' : 'unchecked'}
                        />
                        <Text>{cat.title}</Text>
                    </TouchableOpacity>

                ))}
            </Overlay>
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
        flex: 0.8,
    },
    buttonGroup: {
        flex: 0.2
    },
    dateButton: {
        width: '100%',
        flex: 0.3,
        backgroundColor: 'white',
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.3
    },
    categoryText: {
        textAlign: 'center'
    },
    addButton: {
        backgroundColor: 'white',
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: 'black'
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999'
    }
});

export default AddTodoScreen;