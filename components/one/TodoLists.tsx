import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { FlatList, StyleSheet, VirtualizedList } from 'react-native';
import TodoCard from './TodoCard';

export default function TodoList({lists}:{lists:any[]}){
    return(
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.flatList}
                data={lists}
                keyExtractor={(item, index) => index.toString() }
                renderItem={({ item }) => (
                    <TodoCard
                        label={item}/>
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
    flatList:{
        paddingBottom: 5,
    }
})