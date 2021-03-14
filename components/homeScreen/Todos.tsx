import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native';
import { TodoContext } from '../../contexts/TodoContext';

import TodoItem from './TodoItem';

const Todos = () => {
    const { todos } = useContext(TodoContext);

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