import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, Image,TouchableOpacity, Modal, TextInput } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Calendar from '../components/Calendar'
import TaskItem from '../components/TaskItem'
import { Text, View } from '../components/Themed'
import Navigation from '../navigation'
import { Props } from '../types'



export default function TabTaskScreen<Props>(){
    const date = new Date()
    const[isAddTaskMode, setIsAddTaskMode] = useState(false)
    const[currentMonth, setCurrentMonth] = useState(date.getMonth())
    const[currentDay, setCurrentDay] = useState(date.getDate())
    const[taskList, setTaskList] = useState([
        {key: 1, title: 'Go To Pasar', time: '09.30-10.00', location: 'Jl.Kaliurang'},
        {key: 2, title: 'Go To Stasiun', time: '10.30-14.00', location: 'Jl.Peninggaran'},
        {key: 3, title: 'Do the homework', time: '15.30-17.00', location: 'Jl.Pogung Lor'},
        {key: 4, title: 'Play with my girlfriend', time: '20.30-24.00', location: 'Jl.Jepang'},
    ])
    const[count,setCount] = useState(0)
    const[nameTask, setNameTask] = useState('')
    const[timeTask, setTimeTask] = useState('')
    const[locationTask, setLocationTask] = useState('')
    const[isLogin, setIsLogin] = useState(false)


    const firebaseConfig = {
        apiKey: "AIzaSyCHBQERYLwWXV7c0WNunTB0YTo1El05bfI",
        authDomain: "to-do-app-65492.firebaseapp.com",
        projectId: "to-do-app-65492",
        storageBucket: "to-do-app-65492.appspot.com",
        messagingSenderId: "1097336026558",
        appId: "1:1097336026558:web:bca4589b04ebf920fa35ef",
        measurementId: "G-SE0HYTMSNB"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //           var uid = user.uid;
    //           console.log(uid)
    //           // ...
    //         } else { 
    //           console.log('loggedout')     
    //           setIsLogin(false)         
    //         }
    //     });
    //     if (isLogin) {
        
    //     }else{
    //         console.log('loggedout')
    //     }
    // })
    

    const ref = firebase.firestore().collection('users-task')

    let name = "Joko"
    const FloatingButton = ({style, onPress}) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={require('../assets/images/add.svg')} style={{width: 30, height: 30, }}/>
        </TouchableOpacity>
    )   
    const AddTaskHandler = () => {
        const key = taskList[taskList.length - 1].key
        // const newTask = [...taskList, {key: key+1, title: 'New Task Added', time: '09.00-12.00', location: 'Gg. Masjid'}]
        // setTaskList(newTask)
        setIsAddTaskMode(true)
    }


    const SubmitAddTaskHandler = () => {
        const key = taskList[taskList.length - 1].key+1
        const newTask = [...taskList, {key: key, title: nameTask, time: timeTask, location: locationTask}]
        ref.doc('mFjwa9wvS15aqe7u1wjJ').update({
            tasks: newTask
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
        setTaskList(newTask)
        setIsAddTaskMode(false)
    }

    const Logout = ({navigation}) => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Sign out success')
            navigation.navigate('TabAuth')

          }).catch((error) => {
            // An error happened.
            console.log('Sign out error')
          });
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
                    <TouchableOpacity onPress={Logout}>
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
        bottom: 25,
    },
        addTaskModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
   
})

// export default TabTaskScreen