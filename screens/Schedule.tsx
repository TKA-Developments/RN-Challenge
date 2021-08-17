import { View, Text ,StyleSheet,SafeAreaView,ScrollView} from 'react-native';
import * as React from 'react';
import { Activity } from '../components/Activity';
import { Title } from '../components/Title';
import { Inputs } from '../components/Inputs';

export default function Contoh() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop:30,paddingBottom:50}}>
        <Title/>
      </View>
      <ScrollView  >    
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
        <Activity types='process' />
      </ScrollView>
       <Inputs/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputSection: {
    justifyContent: 'flex-end'
    
  },
});

