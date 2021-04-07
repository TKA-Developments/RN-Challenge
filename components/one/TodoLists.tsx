import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { FlatList, StyleSheet, VirtualizedList } from 'react-native';
import TodoCard from './TodoCard';
import { TodoContext } from '../../context/todoContexts';
import { TODO_LIST_ACTION_TYPES } from '../../context/todoReducer';

export default function TodoList(){

    const { state, dispatch } = React.useContext(TodoContext)
    
    return(
        <View style={styles.container}>
            <FlatList
                data={state}
                keyExtractor={(item, index) => index.toString() }
                renderItem={({ item }) => (
                    <TodoCard
                        todo={item}/>
                )}
                showsVerticalScrollIndicator = {false}
                overScrollMode = "never"                
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',     
        alignItems:'stretch',
        paddingTop: 10,
    },
})