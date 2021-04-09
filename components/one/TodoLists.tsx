import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { FlatList, StyleSheet, } from 'react-native';
import TodoCard from './TodoCard';
import { TodoContext, TodoProvider } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';

export default function TodoList(){

    const { state, dispatch } = React.useContext(TodoContext)
    
    function isEmpty (value: string) {
        if (value.length<1) return true
        if (value.replace(/ /g, "").length<1) return true
        return false
    }
        // dispatch({
        //     type: TodoActions.Add,
        //     payload:{
        //         id: i,
        //         title: `Todo ${i}`,
        //         description: `Description of Todo ${i}`,
        //         date: new Date(),
        //         done: false,
        //     }
        // })
        //const { state, dispatch } = React.useContext(TodoContext)
        // this.state
        // const filtered = this.state ?
        //     this.state.data.filter(x => 
        //         x.title.toLowerCase().includes(this.state.searchText.toLowerCase())
        //         ) : this.state.data

        const data = !isEmpty(state.filter) ?
                    state.lists. filter(x=>
                        ( x.title.toLowerCase().includes(state.filter.toLowerCase()) ) ||
                        ( x.description.toLowerCase().includes(state.filter.toLowerCase()) )
                    ) : state.lists
        return(
            <TodoProvider >
                <View style={styles.container}>
                    
                    <FlatList
                        data={data}
                        contentContainerStyle={styles.flatList}
                        keyExtractor={(item, index) => index.toString() }
                        renderItem={({ item }) => (
                            <TodoCard
                                todo={item}/>
                        )}
                        showsVerticalScrollIndicator = {false}
                        overScrollMode = "never"                
                    />
                </View>
            </TodoProvider>
        )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',     
        alignItems:'stretch',
        paddingTop: 10,
    },
    flatList:{
        paddingBottom: 15,
    }
})
