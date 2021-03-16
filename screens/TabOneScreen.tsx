
import { StyleSheet,TextInput, Button , Alert, ScrollView , Header, SafeAreaView, TouchableOpacity ,Modal,Pressable } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as React from 'react';
import { Ionicons, MaterialIcons, Fontisto } from '@expo/vector-icons'; 
export default function TabOneScreen() {

  const [search, onChangeSearch] = React.useState("")
  const [newName, onChangeNewName] = React.useState("")
  const [newDescription, onChangeNewDescription] = React.useState("")


  const [text, onChangeText] = React.useState("")
  const [arrayItem, setToDoItem] = React.useState()
  const [description, onChangeDescription] = React.useState("")
  const [objectMap, setMap] = React.useState();
  

  function addItem(text) {
    var map = new Map();
    map.set(text, 0);
    console.log(map)
    setMap(map)
    for (let element of map){
    console.log(element) }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style = {{marginBottom: 20}}> What's your plan today? </Text>
      <View style = {styles.inputview}>
      <TextInput 
          style = {styles.input}
          onChangeText = {onChangeText}
          value = {text}
          placeholder = 'Add new item'
      />
      </View>
      <View style = {styles.inputview}>
      <TextInput 
          style = {styles.input}
          onChangeText = {onChangeDescription}
          value = {description}
          placeholder = 'Set description'
      />
      
        {/* <Text>{objectMap.keys()</Text> */}

      </View>
      <View style = {styles.container}>
     <Ionicons.Button name="add" disabled = {text.length == 0 || description.length == 0 ? true : false } 
          backgroundColor = "white" 
          size={30} 
          color = "black" 
          opacity = {text.length == 0 || description.length == 0 ? '0.3' : '1' }
          onPress = {() => addItem(text)}>Add </Ionicons.Button>
        </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
