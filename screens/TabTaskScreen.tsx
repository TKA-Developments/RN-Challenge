import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, Image,TouchableOpacity } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Calendar from '../components/Calendar'
import TaskItem from '../components/TaskItem'
import { Text, View } from '../components/Themed'
import { Props } from '../types'

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 
//                     'December']

// class TabTaskScreen extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {}
//         this.AddTaskHandler = this.AddTaskHandler.bind(this)
//     }

//     AddTaskHandler(){
//         console.log('Test')
//     }

//     render(){
//         const FloatingButton = ({style, onPress }) => (
//             <TouchableOpacity style={style} onPress={onPress}>
//                 <Image source={require('../assets/images/add.svg')} style={{width: 30, height: 30, }}/>
//             </TouchableOpacity>
//         )  
//         return(
//             <View style={styles.container}>  
//             <ScrollView>
//                 <View style={styles.containerContent}>
//                     <View style={styles.greetContainer} onPress={this.AddTaskHandler}>
//                         <Text style={styles.greetText}>Good Morning, {name}</Text>
//                     </View>
//                     <View style={styles.calendar}>    
//                         <Calendar/> 
//                     </View>
//                     <Text style={styles.menuTitle}>Your Schedule's</Text>
//                     <View style={styles.taskContainer}>
//                         <View>
//                             <TaskItem 
//                                 TaskTitle="Go to Pasar" 
//                                 TaskTime="07.30 - 09.30"
//                                 TaskLocation="Jl.Pasar Ikan Jakarta" 
//                             />         
//                         </View>
//                         <View style={styles.taskItemContainer}>
//                             <TaskItem 
//                                 TaskTitle="Go to Pasar" 
//                                 TaskTime="07.30 - 09.30"
//                                 TaskLocation="Jl.Pasar Ikan Jakarta" 
//                             />
//                         </View>
//                         <View>
//                             <TaskItem 
//                                 TaskTitle="Go to Pasar" 
//                                 TaskTime="07.30 - 09.30"
//                                 TaskLocation="Jl.Pasar Ikan Jakarta" 
//                             />
//                         </View>
//                         <View>
//                             <TaskItem 
//                                 TaskTitle="Go to Pasar" 
//                                 TaskTime="07.30 - 09.30"
//                                 TaskLocation="Jl.Pasar Ikan Jakarta" 
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 </ScrollView>   
//                 <FloatingButton style={styles.floatingButton} onPress={() => console.log('Test')}/> 
//             </View>
//         )
//     }
// }

export default function TabTaskScreen<Props>(){
    const date = new Date()
    const[currentMonth, setCurrentMonth] = useState(date.getMonth())
    const[currentDay, setCurrentDay] = useState(date.getDate())
    const[taskList, setTaskList] = useState([
        {key: 1, title: 'Go To Pasar', time: '09.30-10.00', location: 'Jl.Kaliurang'},
        {key: 2, title: 'Go To Stasiun', time: '10.30-14.00', location: 'Jl.Peninggaran'},
        {key: 3, title: 'Do the homework', time: '15.30-17.00', location: 'Jl.Pogung Lor'},
        {key: 4, title: 'Play with my girlfriend', time: '20.30-24.00', location: 'Jl.Jepang'},
    ])
    const[count,setCount] = useState(0)



    let name = "Joko"
    const FloatingButton = ({style, onPress}) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={require('../assets/images/add.svg')} style={{width: 30, height: 30, }}/>
        </TouchableOpacity>
    )   
    const AddTaskHandler = () => {
        const key = taskList[taskList.length - 1].key
        const newTask = [...taskList, {key: key+1, title: 'New Task Added', time: '09.00-12.00', location: 'Gg. Masjid'}]
        setTaskList(newTask)
    }
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
                        {/* <View>
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
                        </View> */}
                    </View>
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
    }
})

// export default TabTaskScreen