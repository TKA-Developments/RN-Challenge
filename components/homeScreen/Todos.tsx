import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native';
import { TodoContext, ITodoGroupByDate } from '../../contexts/TodoContext';

import TodosGroupDate from './TodosGroupDate';

const Todos = () => {
    const { todos } = useContext(TodoContext);
    // somehow todos can't be supplied directly to flatlist
    let todosTemp: ITodoGroupByDate[] = [];
    todos.forEach(todo => {
        todosTemp.push(todo);
    });


    return (
        <View>
            <FlatList
                data={todosTemp}
                renderItem={({ item }) => {
                    console.log(item);
                    return (
                        <TodosGroupDate todos={item} />
                    )
                }}
            />
        </View>
    );
}

export default Todos;