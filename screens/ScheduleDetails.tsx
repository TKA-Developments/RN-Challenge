import * as React from 'react';
import { StyleSheet,TouchableOpacity ,ScrollView} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View ,  } from '../components/Themed';
import { Activity } from '../components/Activity';
import { ScreenContainer } from 'react-native-screens';

export default function ScheduleDetails() {
  const getDateLive = () => {
    const date = new Date().toUTCString().split(' ')
    let dateNow = ''
    for (let i = 0; i < 4; i++){
      dateNow += date[i] + ' '
    }
    return dateNow
  }
  return (
    <View style={styles.container}>
      <ScrollView>      
      <View style={styles.titleWrapper}>
          <Text style={styles.textDate}>{getDateLive()}</Text>
          <Text style={styles.textSpirit} >Great Work!!! Keep Up Your productivity</Text>  
        </View>
        <View style={styles.sectionDetail}>
          <View style={styles.containerDetail}>
           <View style={styles.textWrapper}>
            <Text style={styles.textAngka} >10</Text>
          </View>
          <Text style={styles.textDetails}>On Going Activity</Text>
        </View>
         <View style={styles.containerDetail}>
           <View style={styles.textWrapper}>
            <Text style={styles.textAngka} >10</Text>
          </View>
          <Text style={styles.textDetails}>You Have Done</Text>
       </View>
        </View>
     <TouchableOpacity style={styles.resetBtnContainer}>
          <Text style={styles.resetBtn}>Reset Activity, and Start New Day</Text>
      </TouchableOpacity>
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  sectionDetail: {
    flex: 1,
    paddingTop:50,
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  containerDetail: {
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textAngka: {
    textAlign:'center',
    fontSize: 50,
    fontWeight:'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  titleWrapper: {
    marginTop: 20,
    alignItems:'center'
  },
  textDate: {
    fontSize: 20,
    fontWeight:'bold'
  },
  textDetails: {
    marginTop: 5,  
    fontSize: 18,
    fontWeight:'bold'
  },
  textWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent:'center'
  },
  textSpirit: {
    fontWeight:'bold',
    textAlign:'center',
    width: '95%',
    marginTop: 10,
    marginBottom:10,
    fontSize:22
  },
  resetBtn: {
    paddingTop:8,
    textAlign:'center',
    borderWidth: 1,
    color: '#fff',
    fontWeight:'bold',
    height: 40,
    width: '60%',
    borderRadius: 20,
    backgroundColor:'red'
  },
  resetBtnContainer: {
justifyContent:'flex-end',
    alignItems: 'center',
    height:200,
    backgroundColor:'#fff'
  }
});
