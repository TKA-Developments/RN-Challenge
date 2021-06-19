import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, FlatList} from 'react-native';
import TodoItem from './TodoItem';

interface TodoListProps{
    data: any,
    onToggle: (id: string) => (e: any) => void,
    onRemove: (id: string) => (e: any) => void,
    onEdit: (id: string, newName: string) => (e: any) => void
}

export default function TodoList(props: TodoListProps) {
    // let dateA = new Date(2021, 6, 19, 8, 12, 0);
    // let dateB = new Date(2021, 6, 19, 10, 20, 0);

    // const todos = [
    //     { taskName: 'Learn at Udemy', completedStatus: true, date: dateA, id: '1' },
    //     { taskName: 'Build an App', completedStatus: false, date: dateB, id: '2' },
    // ];
    console.log(props);
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={props.data}
            renderItem={({item})=>{
                return <TodoItem 
                    id={item.id} 
                    name={item.taskName} 
                    completed={item.completedStatus} 
                    onToggle={props.onToggle} 
                    onRemove={props.onRemove}
                    onEdit={props.onEdit}/>;
            }} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});