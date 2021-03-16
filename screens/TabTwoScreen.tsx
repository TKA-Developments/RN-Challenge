import * as React from 'react';
import { StyleSheet,TextInput, Button , Alert, ScrollView , Header, SafeAreaView, TouchableOpacity ,Modal,Pressable } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View  } from '../components/Themed';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import styled from 'styled-components'
import 'react-native-gesture-handler';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { Ionicons, MaterialIcons, Fontisto } from '@expo/vector-icons'; 


const firebaseConfig = {
  apiKey: "AIzaSyDxUJAm3PQwz3XpjT2eL6A7n6AOUl5VmME",
  authDomain: "testingdb-b0b44.firebaseapp.com",
  projectId: "testingdb-b0b44",
  storageBucket: "testingdb-b0b44.appspot.com",
  messagingSenderId: "10409144810",
  appId: "1:10409144810:web:08e0d41ff585fdff3e8293",
  measurementId: "G-XZ56NT274F"
}  // apiKey, authDomain, etc. (see above)

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}
const dbh = firebase.firestore();


const Container=styled.View`
    flex:1;
    padding:50px 0;
    justify-content:center;
    background-color: #f4f4f4;
    align-items:center
`
const Title=styled.Text`
font-size:20px;
text-align:center;
color:black;
font-weight: bold;
marginBottom: 20px
`
const Item=styled.View`
flex: 1;
border:1px solid #ccc;
margin:5px 0;
border-radius:10px;
box-shadow:0 0 10px #ccc;
background-color:#fff;
width:80%;
padding:25px;
`


export default function TabTwoScreen() {
  

  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s,c} = bootstrapStyleSheet;
 

  const [search, onChangeSearch] = React.useState("")
  const [newName, onChangeNewName] = React.useState("")
  const [newDescription, onChangeNewDescription] = React.useState("")


  const [text, onChangeText] = React.useState("")
  const [arrayItem, setToDoItem] = React.useState()
  const [completedItemArray, setAsComplete] = React.useState([]);
  const [uncompletedItemArray, setAsNotComplete] = React.useState([]);
  const [description, onChangeDescription] = React.useState("")
  const [deletedDoc, setDeletedDoc] = React.useState();
  const [day, setDay] = React.useState();
  const [dayname, setDayName] = React.useState();
  const [month, setMonth] = React.useState(new Date().toLocaleString());
  const [year, setYear] = React.useState();
  const [hours, setHours] = React.useState();
  const [minutes, setMinutes] = React.useState();
  const [second, setSecond] = React.useState();
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  
  const [searchItem, setSearchItem] = React.useState();
  const [editItem, setEditItem] = React.useState();



  const editButtonAlert = (name,description) =>
    Alert.alert(
      name,
      "TO DO: " + (description),
      [
        {
          text: "Edit",
          onPress: () => handleOnEdit(name)
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
  
  const viewItemAlert = (name,description) =>
    Alert.alert(
      name,
      "TO DO: " + (description),
      [
        {
          text: "OK",
          onPress: () => console.log("Edit pressed")
        }
      ]
    );

  const deleteButtonAlert = (name) =>
    Alert.alert(
      "Confirm Deletion",
      "Are you sure want to delete this item?",
      [
        {
          text: "Yes",
          onPress: () => deleteItem(name),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );

  const markAsDoneAlert = (name) =>
    Alert.alert(
      "Confirm Done Item",
      "Are you sure want to mark this item as done?",
      [
        {
          text: "Yes",
          onPress: () => markAsDone(name),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );

  

  function fetchDatabase() {
    dbh.collection("todolist").orderBy('name')
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push(data);
        });
        console.log(list)
        setToDoItem(list)
      })
      .catch((error) => console.log("not defined"));

  }

  function addItem(text,desc) {
    dbh.collection("todolist").add({
      name: text,
      description: desc,
      completed: false
    }).then(() => {
        fetchDatabase();
        fetchUncompletedArray();
    })
    .catch((error) => console.log("Failed to submit."))
    onChangeText('')
    onChangeDescription('')
  }

  function deleteItem(key) {
    dbh.collection("todolist").where("name","==",key)
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.id;
          dbh.collection("todolist").doc(data).delete().then(() => {
              fetchDatabase();
              fetchCompletedArray();
              }).catch((error) => {
              console.error("Error removing document: ", error);
              });
        });
      })
      .catch((error) => console.log("Failed to delete document"));

  }

  function fetchCompletedArray() {
    dbh.collection("todolist").where("completed","==", true)
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push(data);
        });
        console.log(list)
        setAsComplete(list)
      })
      .catch((error) => console.log("not defined"));
  }

  function fetchUncompletedArray() {
    dbh.collection("todolist").where("completed","==", false)
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push(data);
        });
        console.log(list)
        setAsNotComplete(list)
      })
      .catch((error) => console.log("not defined"));
  }

  function fetchSearchItem(key) {
    dbh.collection("todolist").orderBy('name').startAt(key).endAt(key+ '\uf8ff')
      //  dbh.collection("todolist").where("name",">=",key).where("name","<=",key + '\uf8ff')
        .get()
        .then((snapshot) => {
          const list = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            list.push(data);
          });
          console.log(list)
          setSearchItem(list)
          if (list.length != 0) {
            setSearchVisible(true);
          }
          if(list.length == 0) {
            Alert.alert("No activity found.")
          }
        })
        .catch((error) => console.log("not defined"));
    
  }

  function fetchEditItem(key) {
    dbh.collection("todolist").where("name","==",key)
      //  dbh.collection("todolist").where("name",">=",key).where("name","<=",key + '\uf8ff')
        .get()
        .then((snapshot) => {
          const list = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            list.push(data);
          });
          console.log(list);
          setEditItem(list);
          if (list.length != 0) {
            setEditVisible(true);
          }
        })
        .catch((error) => console.log("not defined"));
    
  }

  function handleOnSearch(key){
    fetchSearchItem(key);
    onChangeSearch('');
  }

  function handleOnEdit(key){
    fetchEditItem(key);
  }

  function onHandleSubmitEdit(editVisible,previousName,newName,newDescription){
    updateItem(previousName,newName,newDescription)
    setEditVisible(!editVisible);
    onChangeNewDescription('');
    onChangeNewName('');

  }

  function updateItem(previousname,name,description) {
    dbh.collection("todolist").where("name","==",previousname)
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.id;
          console.log(data)
          dbh.collection("todolist").doc(data).update({
            name: name,
            description: description,
          }).then(() => {
            fetchDatabase();
            fetchCompletedArray();
            fetchUncompletedArray();
            Alert.alert("Item succesfully updated")
          })
        });
      })
      .catch((error) => console.log("Failed to update document"));
  }


  function markAsDone(name) {
    dbh.collection("todolist").where("name","==",name)
      .get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.id;
          dbh.collection("todolist").doc(data).update({
            completed : true,
          }).then(() => {
            fetchCompletedArray();
            fetchUncompletedArray();
            Alert.alert("Item successfully mark as done.")
          })
        });
      })
      .catch((error) => console.log("Failed to update document"));
  }

  React.useEffect(() => {
    fetchDatabase();
    fetchCompletedArray();
    fetchUncompletedArray();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    

    let secTimer = setInterval( () => {
      var current_hours = new Date().getHours()
      current_hours = ("0"+ current_hours).slice(-2)
      var current_minutes = new Date().getMinutes()
      current_minutes = ("0" + current_minutes).slice(-2)
      var current_seconds = new Date().getSeconds()
      current_seconds = ("0" + current_seconds).slice(-2)
      setDayName(days[new Date().getDay()])
      setDay(new Date().getDate().toString())
      setMonth(monthNames[new Date().getMonth()])
      setYear(new Date().getFullYear().toString())
      setHours(current_hours)
      setMinutes(current_minutes)
      setSecond(current_seconds)
    },1000)
    return () => clearInterval(secTimer);
  }, [])


  return (

    
    <ScrollView>
    <Container>

      
      
      <Text style = {styles.title}> Activity Management </Text> 
      
      <View style = {styles.calendarview}>
      <Text style = {{fontStyle: 'italic'}}>
      {dayname}, {day}{" "}{month}{" "}{year}</Text>
      <Text style = {{fontStyle: 'italic'}}>{hours}:{minutes}:{second} </Text>
      </View>

      <Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={searchVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSearchVisible(!searchVisible);
        }}
      >
        <Container>
        <ScrollView>
        <Text style = {styles.title}> Search Result </Text>
        {searchItem && searchItem.map((list,key) => (
          <View style={styles.inputview2}>
            <Title>{list.name}</Title>
            <Text style={styles.modalText}>To do : {list.description}</Text>

            {/* <Text style={styles.modalText}>{list.description}</Text> */}
            
        </View>
        )) 
        }
        </ScrollView>
        </Container>
        <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setSearchVisible(!searchVisible)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
      </Modal>
      </Container>

      <Item style = {{marginTop: -50}}>
      <View style = {styles.inputview}>
      <TextInput 
          style = {styles.input}
          onChangeText = {onChangeSearch}
          value = {search}
          placeholder = 'Search for activity'
      /></View>
      <View style = {styles.container}>
      <Ionicons.Button name="search" disabled = {search.length == 0 ? true : false } 
          backgroundColor = "white" 
          size={30} 
          color = "black" 
          opacity = {search.length == 0 ? '0.3' : '1' }
          onPress = {() => handleOnSearch(search)}>Search </Ionicons.Button></View>
      </Item>
    

      <Item>
      <Title style = {{marginBottom: 20}}> What's your plan today? </Title>
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
      </View>
      
      <View style = {styles.container}>
     <Ionicons.Button name="add" disabled = {text.length == 0 || description.length == 0 ? true : false } 
          backgroundColor = "white" 
          size={30} 
          color = "black" 
          opacity = {text.length == 0 || description.length == 0 ? '0.3' : '1' }
          onPress = {() => addItem(text,description)}>Add </Ionicons.Button>
        </View>
      </Item>
      

      <Item>
        <Title>To-Do List: </Title>
        {/* <Text>{arrayItem}</Text> */}
         
        { arrayItem &&
          arrayItem.map((list,key) => (
            
            <View style = {styles.inputview}> 
              <Text style = {styles.todotext} 
                onPress = {() => viewItemAlert(list.name,list.description)}    > {list.name}  </Text>

               <Text>
               <MaterialIcons.Button 
                  name="mode-edit" 
                  backgroundColor = "#f4f4f4"
                  size={25} 
                  color="blue"
                  onPress = {() => editButtonAlert(list.name,list.description)}>Edit</MaterialIcons.Button>
              <MaterialIcons.Button 
                  name="delete" 
                  backgroundColor = "#f4f4f4"
                  size={25} 
                  color="red"
                  onPress = {() => deleteButtonAlert(list.name)}>Delete</MaterialIcons.Button>
              <Ionicons.Button 
                  name="checkmark-done-outline" 
                  backgroundColor = "#f4f4f4"
                  size={25} 
                  color="green"
                  onPress = {() => markAsDoneAlert(list.name)}>Mark As Done</Ionicons.Button>
              </Text>
              </View>
              
            )
          )
        }
        </Item>


      <Modal
        animationType="slide"
        transparent={false}
        visible={editVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEditVisible(!editVisible);
        }}
      >
        <Container>
        <ScrollView>
        <Text style = {styles.title}> Edit Item </Text>
        {editItem && editItem.map((list,key) => (
          <View style={styles.inputview2}>
            <Title>{list.name}</Title>
            <Text style={styles.modalText}>To do : {list.description}</Text>
            <View style = {styles.inputview}>
              <TextInput 
                  style = {styles.input2}
                  onChangeText = {onChangeNewName}
                  value = {newName}
                  placeholder = 'Set new name'
              />
            </View>
            <View style = {styles.inputview}>
              <TextInput 
                  style = {styles.input2}
                  onChangeText = {onChangeNewDescription}
                  value = {newDescription}
                  placeholder = 'Set new description'
              />
            </View>
            <Pressable
              disabled = {newName.length == 0 || newDescription.length == 0 ? true : false}
              style={[styles.button2, styles.buttonClose]}
              opacity = {newName.length == 0 || newDescription.length == 0 ? 0.3 : 1}
              onPress={() => onHandleSubmitEdit(editVisible,list.name,newName,newDescription)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setEditVisible(!editVisible)}
            >
            <Text style = {styles.textStyle}> Cancel </Text>
            </Pressable>
            {/* <Text style={styles.modalText}>{list.description}</Text> */}
            
        </View>
        )) 
        }
        </ScrollView>
        </Container>
        
      </Modal>


      <Item>
        <Title>Completed Item</Title>
        {/* <Text>{arrayItem}</Text> */}

        {
          completedItemArray.map((list,key) => (
            <View style = {styles.inputview}>
              <Text style= {styles.todotext}> {list.name}  </Text>
              {/* <Button
                title = "Delete"
                color="#841584"
                onPress = {() => Alert.alert("Clicked delete")}
              > </Button>  */}
            </View>
            )
          )
        }
      
      </Item>

      <Item>
        <Title>Uncompleted Item</Title>
        {/* <Text>{arrayItem}</Text> */}
        {
          uncompletedItemArray.map((list,key) => (
            <View style = {styles.inputview}>
              <Text style= {styles.todotext}> {list.name}  </Text>
              {/* <Button
                title = "Delete"
                color="#841584"
                onPress = {() => Alert.alert("Clicked delete")}
              > </Button>  */}
            </View>
            )
          )
        }
      </Item>

      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />

      </Container>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  button2: {
    borderRadius: 100,
    padding: 30,
    marginBottom: 20
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    width: 200,
    height: 'auto'
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center"
  },
  searchview: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'rgba(225,225,225,0.3)',
    marginBottom: 16,
    padding: 30,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scrollview: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  additem: {
    display: 'flex',
    marginTop: 20
  },
  todotext: {
    fontSize: 18,
    marginBottom: 10,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'black'
  },
  todolist: {
    display: 'flex',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  calendarview: {
    alignItems: 'center',
    backgroundColor: 'rgba(225,225,225,0.3)',
    marginBottom: 16,
    padding: 25,
    borderRadius: 20,
  },
  inputview: {
    backgroundColor: 'rgba(225,225,225,0.3)',
    marginBottom: 16,
    padding: 10,
    borderRadius: 20
  },
  inputview2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(225,225,225,0.3)',
    marginTop: 30,
    marginBottom: 0,
    padding: 30,
    borderRadius: 50
  },
  buttondiv: {
    backgroundColor: 'rgba(225,225,225,0.3)',
    marginBottom: 16,
    padding: 10,
    borderRadius: 20
  },
  input: {
    color: 'black'
  },
  input2: {
    color: 'black',
    width: 200
  },
  title: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Arial',
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: '100%',
  },
  todotitle: {
    position: 'relative',
    left: '0%',
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  filteritem: {
    display: 'flex'
  }
});
