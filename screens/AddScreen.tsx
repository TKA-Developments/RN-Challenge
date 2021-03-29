import * as React from 'react';
import { StyleSheet,ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddScreen(props){
        return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Done</Text>
            <View style={styles.separator} lightColor="#aaa" darkColor="rgba(255,255,255,0.1)" />

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Goals</Text>
                    <TextInput 
                    style={styles.inputBar}
                    placeholder='Your Daily Goals'/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Date</Text>
                    <TextInput 
                    style={styles.inputBar}
                    placeholder='What Date Will be Done?'/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Hour</Text>
                    <TextInput 
                    style={styles.inputBar}
                    placeholder='What Time Will It be Held?'/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Description</Text>
                    <TextInput 
                    style={styles.inputBar}
                    placeholder='Some Additional Would Not Hurt You'/>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 50
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    form:{
        paddingHorizontal: 40,
        marginBottom: 10
    },
    inputContainer:{
        paddingVertical: 10
    },
    inputTitle:{
        fontSize: 20,
        marginBottom: 5
    },
    inputBar:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
    },
    button:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkgreen',
        borderRadius: 15,
        paddingVertical: 10,
        width: '80%'
    },
    buttonTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    }
})
