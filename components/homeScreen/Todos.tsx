import React from 'react';
import { TodoItemProps } from './TodoItem';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native';

import TodoItem from './TodoItem';

export interface TodosProps {
    todos: TodoItemProps[],
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
    return (
        <View>
            <FlatList
                data={todos}
                renderItem={({ item }) => {
                    return (
                        <TodoItem {...item} />
                    )
                }}
            />
        </View>
    );
}

export default Todos;