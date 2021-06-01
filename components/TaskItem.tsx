import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from './Themed'

class TaskItem extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return (
            <TouchableOpacity style={styles.taskItemContainer}>
                <View style={styles.taskItemContent}>
                    <Text>{this.props.TaskTitle}</Text>
                    <Text>{this.props.TaskTime}</Text>
                    <Text>{this.props.TaskLocation}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    taskItemContainer: {
        borderRadius: 5,
        height: 130,
        marginVertical: 5,
        borderWidth: 0.5,
    },
    taskItemContent: {
        marginHorizontal: 15,
    }
})

export default TaskItem