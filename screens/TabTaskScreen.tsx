import firebase from 'firebase'
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Image, TouchableOpacity, Modal, TextInput, FlatList, ScrollView } from 'react-native'
import {  } from 'react-native-gesture-handler'
import Calendar from '../components/Calendar'
import TaskItem from '../components/TaskItem'
import { Text, View } from '../components/Themed'
import { AuthContext } from '../context/Auth'
import { PropsParam, ButtonParam} from '../types'




export default function TabTaskScreen<Props>({}){
    const date = new Date()
    const[isAddTaskMode, setIsAddTaskMode] = useState(false)
    const[taskList, setTaskList] = useState<any[]>([])
    const[nameTask, setNameTask] = useState('')
    const[timeTask, setTimeTask] = useState('')
    const[locationTask, setLocationTask] = useState('')
    const authContext = useContext(AuthContext)

    const db = firebase.firestore();
    
    const fetchTask = () => {
        return db.collection('users').doc(authContext.authData?.uid).get()
    }
    const setTaskFirebase = (newTask:Array<object>) => {
        return db.collection('users').doc(authContext.authData?.uid).set(newTask)
    }
    useEffect(() => {
        fetchTask().then((doc) => {
            const data: firebase.firestore.DocumentData | undefined = doc.data()
            if (doc.exists && data) {
                setTaskList(data.tasks)
            }else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error : " + error)
        })
    })



    let name = authContext.authData?.displayName
    const FloatingButton : React.FC<ButtonParam> = ({style, onPress}) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={{uri: 'https://storage.googleapis.com/image_bucket_todo/add.svg'}} style={{width: 30, height: 30, }}/>
        </TouchableOpacity>
    )   
    const AddTaskHandler = () => {
        setIsAddTaskMode(true)
    }
   
 
    const SubmitAddTaskHandler = () => {
        const key:number = taskList[taskList.length - 1].key+1
        const newTask = [...taskList, {key: key, title: nameTask, time: timeTask, location: locationTask}]
        db.collection('users').doc(authContext.authData?.uid).update({
            tasks: newTask
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
        setTaskList(newTask)
        setIsAddTaskMode(false)
    }

    return (
            <View style={styles.container}>
            <Modal
             animationType="slide"
             transparent={true}
             visible={isAddTaskMode}
             style={styles.addTaskModal}
             onRequestClose={() => {
                 setIsAddTaskMode(false)
             }}
             >
                <View style={styles.addTaskModal}>
                    <Text>Ini Modal Tambah Task</Text>
                    <TextInput
                        onChangeText={nameTask => setNameTask(nameTask)}
                        defaultValue={nameTask}
                        placeholder='Task Name...'
                    />
                    <TextInput
                        onChangeText={timeTask => setTimeTask(timeTask)}
                        defaultValue={timeTask}
                        placeholder='Task Time...'
                    />
                    <TextInput
                        onChangeText={locationTask => setLocationTask(locationTask)}
                        defaultValue={locationTask}
                        placeholder='Task Location...'
                    />
                    <TouchableOpacity onPress={SubmitAddTaskHandler}>
                        <Text>Create Task</Text>
                    </TouchableOpacity>
                </View>   
            </Modal>  
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
                        <FlatList
                            data={taskList}
                            keyExtractor={item => item.key}
                            renderItem={({item}) => (
                                <TaskItem
                                    TaskTitle={item.title}
                                    TaskTime={item.time}
                                    TaskLocation={item.location}
                                />
                            )}
                        />
                    </View>
                    <TouchableOpacity onPress={authContext.signOut}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>                  
                    <FloatingButton style={styles.floatingButton} onPress={AddTaskHandler}/>            
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
        backgroundColor: '#7767E4',
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 40,
    },
        addTaskModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    }
   
})

// export default TabTaskScreen