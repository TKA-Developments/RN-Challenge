import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { StyleSheet } from 'react-native';
import { Todo } from '../../types';

export default function TodoCard({todo} : {todo: Todo}){
    return(
        <View style={[styles.container, { backgroundColor: '#01579B' }]}
            >
            <Text style={styles.titleStyle}>{todo.title}</Text>
            <Text style={styles.descStyle}>{todo.description}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {        
        opacity: 0.8,
        borderRadius: 8,
        padding: 10,
        alignItems: 'stretch',
        marginBottom: 5,    
        height: 80,
    },
    titleStyle: {
        flex: 1,
        fontSize: 18,
        color: '#FFFFFF',
    },
    descStyle:{
        flex: 1,
        fontSize: 14,
        color: '#F5F5F5',
    }

})