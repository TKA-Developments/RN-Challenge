import React, { useState } from 'react'
import { StyleSheet, Button, Image } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Calendar from '../components/Calendar'
import TaskItem from '../components/TaskItem'
import { Text, View } from '../components/Themed'

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 
//                     'December']

export default function TabTaskScreen(){
    const[currentMonth, setCurrentMonth] = useState(1)

    let name = "Joko"
    const FloatingButton = ({style}) => (
        <TouchableOpacity style={style}>
            <Image source={require('../assets/images/add.png')}/>
        </TouchableOpacity>
    ) 

    return (
            <View style={styles.container}>  
            <ScrollView>
                <View style={styles.containerContent}>
                    <View style={styles.greetContainer}>
                        <Text style={styles.greetText}>Good Morning, {name}</Text>
                    </View>
                    <View style={styles.calendar}>    
                        <Calendar/> 
                    </View>
                    <Text style={styles.menuTitle}>Your Schedule's</Text>
                    <View style={styles.taskContainer}>
                        <View>
                            <TaskItem 
                                TaskTitle="Go to Pasar" 
                                TaskTime="07.30 - 09.30"
                                TaskLocation="Jl.Pasar Ikan Jakarta" 
                            />         
                        </View>
                        <View style={styles.taskItemContainer}>
                            <TaskItem 
                                TaskTitle="Go to Pasar" 
                                TaskTime="07.30 - 09.30"
                                TaskLocation="Jl.Pasar Ikan Jakarta" 
                            />
                        </View>
                        <View>
                            <TaskItem 
                                TaskTitle="Go to Pasar" 
                                TaskTime="07.30 - 09.30"
                                TaskLocation="Jl.Pasar Ikan Jakarta" 
                            />
                        </View>
                        <View>
                            <TaskItem 
                                TaskTitle="Go to Pasar" 
                                TaskTime="07.30 - 09.30"
                                TaskLocation="Jl.Pasar Ikan Jakarta" 
                            />
                        </View>
                    </View>
                </View>
                </ScrollView>   
                <FloatingButton style={styles.floatingButton}/> 
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 15,
    }, 
    greetContainer: {
        marginTop: 20,
    },
    greetText : {
        fontSize: 23,
    },
    calendar : {
        marginVertical: 15,
    },
    taskContainer : {
        marginVertical: 15,
    },  
    menuTitle: {
        marginVertical: 5,
        fontSize: 23,
    },
    floatingButton: {
        borderRadius: 80,
        backgroundColor: 'aqua',
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 25,
    }
})