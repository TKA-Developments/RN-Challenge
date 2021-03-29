import * as React from 'react';
import { StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Done</Text>
      <View style={styles.separator} lightColor="#aaa" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}

      <ScrollView>
        <View style={styles.todayContainer}>
          <Text style={styles.todayTitleText}>Today Activity!</Text>
          
          <View style={styles.activityContainer}>
            <Text>mencuci piring</Text>
            <Text>10:00</Text>
            <TouchableOpacity>
              <Ionicons name='checkbox-outline' style={styles.checkBox}/>
            </TouchableOpacity>
          </View>
          
        </View>
        
        <View style={styles.tomorrowContainer}>
          <Text style={styles.tomorrowTitleText}>Tomorrow Activity!</Text>
          
          <View style={styles.activityContainer}>
            <Text>mencuci piring</Text>
            <Text>10:00</Text>
            <TouchableOpacity>
              <Ionicons name='checkbox-outline' style={styles.checkBox}/>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddScreen')}>
        <Text style={styles.addTitle}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 50
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
  addButton:{
    backgroundColor: '#bbb',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 30,
    marginRight: 10,
    position: 'relative'
  },
  addTitle:{
    textAlign: 'center',
    fontSize: 25
  },
  todayContainer:{
    alignSelf: 'center',
    marginBottom: 30,
    width: '90%',
    elevation: 5,
    borderColor: '#bbb',
    paddingBottom: 8
  },
  todayTitleText:{
    textAlign: 'center',
    backgroundColor: '#bbb',
    color: '#fff',
    fontSize: 23,
    paddingVertical: 6,
    marginBottom: 8
  },
  tomorrowContainer:{
    alignSelf: 'center',
    marginBottom: 30,
    width: '90%',
    elevation: 5,
    borderColor: '#bbb',
    paddingBottom: 8
  },
  tomorrowTitleText:{
    textAlign: 'center',
    backgroundColor: '#bbb',
    color: '#fff',
    fontSize: 23,
    paddingVertical: 6,
    marginBottom: 8
  },
  activityContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  checkBox:{
    fontSize: 20
  }
});
