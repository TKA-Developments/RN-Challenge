import React, { useState, useEffect } from 'react'
import { Button,StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from '../components/Themed'

function getDaysInMonth(month : number ,year : number){
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
 }

class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            months: [
                {key: 1, month: 'January'},
                {key: 2, month: 'February'},
                {key: 3, month: 'March'},
                {key: 4, month: 'April'},
                {key: 5, month: 'May'},
                {key: 6, month: 'Juny'},
                {key: 7, month: 'July'},
                {key: 8, month: 'August'},
                {key: 9, month: 'September'},
                {key: 10, month: 'October'},
                {key: 11, month: 'November'},
                {key: 12, month: 'December'},
            ],
            days: [],
        }
    }

    componentDidMount(){
        const date = new Date()
        let daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear())
        this.setState({days: daysInMonth})
        this.setState({selectedMonth: date.getMonth()})
    }

    render() {
    console.log(this.state.selectedMonth)
    const MonthItem = ({ item, onPress, style }) => (
        <TouchableOpacity style={style}>
            <Text onPress={onPress}>{item.month}</Text>
        </TouchableOpacity>
    )

    const DayItem = ({item}) => (
        <TouchableOpacity style={styles.dayPickerItem}>
            <Text style={styles.dayPickerText}>{item}</Text>
        </TouchableOpacity>
    )
        
        return (
            <View>
             <View style={styles.monthPicker}>
               <FlatList
                     horizontal='true'
                     data={this.state.months}
                     renderItem={({item}) => (
                         <MonthItem
                             item={item}
                             style={styles.monthPickerItem}
                             onPress={() => this.setState({selectedMonth: item.key})}
                         />
                     )}
                 />
             </View>
             <View style={styles.dayPicker}>
             <FlatList
                     horizontal='true'
                     data={this.state.days}
                     renderItem={({item}) => (
                         <DayItem
                             item={item}
                         />
                     )}
                 />          
             </View>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    monthPicker: { 
        marginBottom: 17,
    },
    monthPickerItem: {
        borderRadius: 6,
        padding: 7,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 7,
    },
    dayPicker: {
        marginBottom: 5,
    },
    dayPickerItem: {
        borderRadius: 9,
        paddingVertical: 16,
        paddingHorizontal: 23,
        backgroundColor: '#7767E4',
        marginHorizontal: 7
    },
    dayPickerText: {
        fontSize: 20,
    }
});

export default Calendar