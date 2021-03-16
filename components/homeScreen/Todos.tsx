import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { FlatList, StyleSheet } from 'react-native';
import { TodoContext, ITodoGroupByDate } from '../../contexts/TodoContext';

import TodosGroupDate from './TodosGroupDate';
import SearchBar from './SearchBar';

const Todos = () => {
    const { todosGroupDate, showOverdue } = useContext(TodoContext);
    // somehow todos can't be supplied directly to flatlist
    let todosTemp: ITodoGroupByDate[] = [];
    todosGroupDate.forEach(todo => {
        todosTemp.push(todo);
    });
    todosTemp = todosTemp.sort((a, b) => (a.date > b.date) ? 0 : ((b.date > a.date) ? -1 : 1))

    return (
        <View style={styles.container}>
            <SearchBar />
            <FlatList
                data={todosTemp}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => {
                    if (showOverdue || item.date != 'overdue') {
                        return (
                            <TodosGroupDate todos={item} />
                        )
                    } else {
                        return null
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 120,
    }
})

export default Todos;