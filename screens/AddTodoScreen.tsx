import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import DatePicker from 'react-native-datepicker';
import { TodoContext } from '../contexts/TodoContext';
import { Overlay } from 'react-native-elements';
import { RadioButton, Divider } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import { Text, View, TextMedium } from '../components/Themed';

const AddTodoScreen = ({ navigation, route }: StackScreenProps<RootStackParamList, 'AddTodo'>) => {
    let today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })).toISOString().slice(0, 10);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [date, setDate] = useState<string>(today);
    const { addTodo, updateTodo, categories, getCategoryColor } = useContext(TodoContext);
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
            <View style={{
                ...styles.headerContainer,
                backgroundColor: Colors[colorScheme].backgroundDarkest
            }}>
                <View style={{
                    ...styles.leftHeaderContainer,
                    backgroundColor: Colors[colorScheme].backgroundDarkest
                }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <AntDesign name='close' size={28} color={Colors[colorScheme].text} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        ...styles.actionButton,
                        backgroundColor: Colors[colorScheme].text
                    }}
                    onPress={onSubmit}
                >
                    <TextMedium
                        style={{
                            ...styles.actionText,
                            color: Colors[colorScheme].backgroundDarkest
                        }}
                    >{route.params ? 'Edit Task' : 'Add Task'}</TextMedium>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <TextInput
                    style={{
                        ...styles.input,
                        color: Colors[colorScheme].text,
                        borderBottomColor: Colors[colorScheme].textDarkest,
                    }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Task title..."
                    placeholderTextColor={Colors[colorScheme].textDarkest}
                />
                <View
                    style={{
                        ...styles.buttonContainer,
                        borderBottomColor: Colors[colorScheme].textDarkest,
                    }}
                >
                    <FontAwesome5 name='clock' size={20} color={Colors[colorScheme].highlighDarker} />
                    <DatePicker
                        style={styles.dateButton}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={today}
                        showIcon={false}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: {
                                borderWidth: 0,
                            },
                            placeholderText: {
                                color: Colors[colorScheme].textDarkest,
                            },
                            dateText: {
                                fontSize: 16,
                                color: Colors[colorScheme].text,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date: string) => { setDate(date) }}
                    />
                </View>
                <View
                    style={{
                        ...styles.buttonContainer,
                        borderBottomColor: Colors[colorScheme].textDarkest,
                    }}
                >
                    <FontAwesome5 name='tasks' size={20} color={Colors[colorScheme].highlighDarker} />
                    <TouchableOpacity style={styles.categoryButton} onPress={toggleOverlay}>
                        <Text style={styles.categoryText}>{category ? <>
                            <FontAwesome
                                name='square'
                                size={20}
                                color={getCategoryColor(category)}
                            />
                            {`  ${category}`}
                        </> : 'Select Category'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Overlay overlayStyle={{
                backgroundColor: Colors[colorScheme].background,
                ...styles.overlayContainer
            }}
                isVisible={overlayVisible}
                onBackdropPress={toggleOverlay}
            >
                <View style={styles.overlayHeaderContainer}>
                    <Text style={styles.overlayHeaderText}>Categories</Text>
                </View>
                {categories.map(cat => (
                    <TouchableOpacity
                        style={{
                            ...styles.radioContainer,
                            borderBottomColor: Colors[colorScheme].textDarkest
                        }}
                        onPress={() => selectCategory(cat.title)}
                    >
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
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
    },
    leftHeaderContainer: {

    },
    contentContainer: {
        padding: 20,
    },
    input: {
        fontSize: 16,
        letterSpacing: 1,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 4
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 0.3,
        paddingVertical: 5
    },
    dateButton: {
        flex: 1,
        borderWidth: 0,
    },
    categoryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    categoryText: {
        textAlign: 'center',
        fontSize: 16,
    },
    actionButton: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 10,
    },
    actionText: {
        fontSize: 16,
        letterSpacing: 1,
    },
    overlayContainer: {
        padding: 20,
        width: '60%'
    },
    overlayHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlayHeaderText: {
        fontSize: 18,
        paddingRight: 7.5,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    }
});

export default AddTodoScreen;