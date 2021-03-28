import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Done</Text>
      <View style={styles.separator} lightColor="#aaa" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}

      <View style={styles.todayContainer}>
        <Text style={styles.todayTitleText}>Today activity!</Text>
        
        <View style={styles.activityContainer}>
          <Text>mencuci piring</Text>
          <Text>10:00</Text>
          <TouchableOpacity>
            <Ionicons name='checkbox-outline' style={styles.checkBox}/>
          </TouchableOpacity>
        </View>
        
      </View>

      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
  todayContainer:{
    alignSelf: 'center',
    marginBottom: 10,
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
