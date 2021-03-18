import React from 'react';
import { Text, TextMedium, View } from '../../components/Themed';
import { FlatList, StyleSheet } from 'react-native';
import { ITodoGroupByDate } from '../../contexts/TodoContext';
import { capitalizeFirstLetter } from '../../utils/typography';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

import TodoItem from './TodoItem';

interface ITodosGroupDateProps {
    todos: ITodoGroupByDate
}

const TodosGroupDate = ({ todos }: ITodosGroupDateProps) => {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextMedium style={{ paddingRight: 7.5 }}>{capitalizeFirstLetter(todos.date)}</TextMedium>
                <View style={{
                    height: 0.5,
                    flex: 1,
                    backgroundColor: Colors[colorScheme].textTertiary,
                }} />
            </View>
            <FlatList
                data={todos.todos}
                renderItem={({ item }) => {
                    return (
                        <TodoItem {...item} />
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7.5,
    },
})

export default TodosGroupDate;