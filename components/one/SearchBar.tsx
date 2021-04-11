import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from '../Themed';
import { StyleSheet } from 'react-native';
import { TodoContext } from '../../context/todoContexts';
import { TodoActions } from '../../context/todoReducer';

export default function SearchBar(){

    const { state, dispatch } = React.useContext(TodoContext)

    const filterTodo = (value: string) => {
        dispatch({
            type: TodoActions.Filter,
            payload: {
                keyword: value,
            }
        })
    }
    return(
        <View style={styles.container}
            darkColor="#424242"
            lightColor="#F5F5F5"
            >
            <Ionicons   name='search-sharp' 
                        size={24}
                        style={styles.iconStyle}                         
                        />
            <TextInput  style={styles.textInputStyle}
                        placeholder='Search'
                        value={state.filter}
                        onChangeText={filterTodo}
                        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems:'center',        
    },
    iconStyle:{
        marginLeft: 2,
        marginRight: 5,
    },
    textInputStyle:{
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 0,
    }

})