import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native';
import { TodoContext, ITodoGroupByDate } from '../../contexts/TodoContext';

import TodosGroupDate from './TodosGroupDate';
import SearchBar from './SearchBar';

const Todos = () => {
    const { todosGroupDate } = useContext(TodoContext);
    // somehow todos can't be supplied directly to flatlist
    let todosTemp: ITodoGroupByDate[] = [];
    todosGroupDate.forEach(todo => {
        todosTemp.push(todo);
    });

    return (
        <View>
            <SearchBar />
            <FlatList
                data={todosTemp}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => {
                    return (
                        <TodosGroupDate todos={item} />
                    )
                }}
            />
        </View>
    );
}

export default Todos;