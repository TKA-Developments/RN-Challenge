import React from 'react';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native';
import { ITodoGroupByDate } from '../../contexts/TodoContext';
import { capitalizeFirstLetter } from '../../utils/typography';

import TodoItem from './TodoItem';

interface ITodosGroupDateProps {
    todos: ITodoGroupByDate
}

const TodosGroupDate = ({ todos }: ITodosGroupDateProps) => {
    return (
        <View>
            <Text>{capitalizeFirstLetter(todos.date)}</Text>
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

export default TodosGroupDate;