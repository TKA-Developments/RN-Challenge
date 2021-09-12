import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Todos = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circle}></View>
        </View>
    )
}

const styles=StyleSheet.create({
    item : {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }, 
    itemLeft : {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemText : {
        maxWidth: '80%'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: 'rgb(255,73,104)',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    circle : {
        width: 12,
        height: 12,
        borderColor: 'rgb(255,73,104)',
        borderWidth: 2,
        borderRadius: 5
    }
})

export default Todos;