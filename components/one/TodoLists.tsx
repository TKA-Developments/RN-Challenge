import React, {useContext, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { IconButton, Text, View } from '../Themed';
import { FlatList, StyleSheet, Alert } from 'react-native';
import TodoCard from './TodoCard';
import { TodoContext, TodoProvider } from '../../context/todoContexts';
import { isEmpty, TodoActions } from '../../context/todoReducer';
import { ToggleButton } from '../Themed'
import { Todo, TodoLists, ToggleButtonValue } from '../../types'
import SearchBar from './SearchBar';

export function SortTodoButtonsGroup(){
    const { state, dispatch } = useContext(TodoContext)
    //const [grid, toggleGrid] = useState(false)
    const [tAll, setAll] = useState<ToggleButtonValue>({
        All: state.toggle == 1,
        Done: state.toggle == 2,
        Undone: state.toggle == 3,
    })
    
    const sortAll = (which: number) => {
        switch(which){
            case 1:
                setAll({
                    All: true,
                    Done: false,
                    Undone: false,
                })
                dispatch({
                    type: TodoActions.Filter,
                    payload: {
                        toggle: 1,
                    }
                })
                break
            case 2:
                setAll({
                    All: false,
                    Done: true,
                    Undone: false,
                })
                dispatch({
                    type: TodoActions.Filter,
                    payload: {
                        toggle: 2,
                    }
                })
                break
            case 3:
                setAll({
                    All: false,
                    Done: false,
                    Undone: true,
                })
                dispatch({
                    type: TodoActions.Filter,
                    payload: {
                        toggle: 3,
                    }
                })
                break
        }        
    }

    const tStyles = StyleSheet.create({
        tButtonStyle:{
            minWidth: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            marginRight: 10,
        },
        icButtonStyle:{
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
        },
        icStyle:{
            padding: 10,
        },
        container:{
            flex: 1,
            marginTop: 10,
            flexDirection: 'row',
        },
        textStyle:{
            padding: 10,
        }
    })

    const checkedColor = '#80D8FF'
    const uncheckedColor = '#F5F5F5'

    const toggleListOrGrid = () => {
        dispatch({
            type: TodoActions.Filter,
            payload: {
                grid: !state.grid,
            }
        })
    }
    return(
        <View style={tStyles.container}>
            <ToggleButton
                style={tStyles.tButtonStyle}
                checked={tAll.All}
                checkedColor={checkedColor}
                uncheckedColor={uncheckedColor}
                onPress={()=>sortAll(1)}
            >
                <Text style={tStyles.textStyle}>All</Text>
            </ToggleButton>
            <ToggleButton
                style={tStyles.tButtonStyle}
                checked={tAll.Done}
                checkedColor={checkedColor}
                uncheckedColor={uncheckedColor}
                onPress={() => sortAll(2)}
            >
                <Text style={tStyles.textStyle}>Done</Text>
            </ToggleButton>
            <ToggleButton
                style={tStyles.tButtonStyle}
                checked={tAll.Undone}
                checkedColor={checkedColor}
                uncheckedColor={uncheckedColor}
                onPress={() => sortAll(3)}
            >
                <Text style={tStyles.textStyle}>Not done yet</Text>
            </ToggleButton>
            <IconButton style={tStyles.icButtonStyle} onPress={toggleListOrGrid}>
                <Feather style={tStyles.icStyle}
                         name={state.grid ? 'grid' : 'list'}
                         size={24}/>
            </IconButton>
        </View>
    )
}

export function ListHeader(){
    return(
        <View>
            <SearchBar/>
            <SortTodoButtonsGroup/>
        </View>
    )
}

export default function TodoList(){

    const { state, dispatch } = useContext(TodoContext)    
    
        const sortdata = 
            state.toggle == 1 ? state.lists :            
            state.toggle == 2 ? state.lists.filter(x=>x.done) :
            state.lists.filter(x=>!x.done)

        const data = !isEmpty(state.filter) ?
                    state.lists.filter(x=>
                        ( x.title?.toLowerCase().includes(state.filter.toLowerCase()) ) ||
                        ( x.description?.toLowerCase().includes(state.filter.toLowerCase()) )
                    ) : sortdata
    const colCount = state.grid ? 2 : 1
        return(            
                <View style={styles.container}>                
                    <FlatList
                        data={data}
                        ListHeaderComponent={ListHeader}
                        ListHeaderComponentStyle={styles.header}
                        contentContainerStyle={styles.flatList}
                        columnWrapperStyle={state.grid ? styles.colWrapperStyle : undefined}
                        keyExtractor={(_, index) => index.toString() }
                        renderItem={({ item }) => (
                            <TodoCard
                                todo={item}/>
                        )}
                        showsVerticalScrollIndicator = {false}
                        overScrollMode = "never" 
                        horizontal={false}
                        key={colCount}
                        numColumns = {colCount}             
                    />
                </View>
            
        )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',     
        alignItems: 'stretch',
    },
    header: {
        marginVertical: 10,        
    },
    flatList:{
        paddingBottom: 15,
    },
    colWrapperStyle:{
        justifyContent:'space-between'
    }
})
