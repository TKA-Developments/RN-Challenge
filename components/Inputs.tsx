import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../constants/firebase";
import { showMessage } from "react-native-flash-message";
export function Inputs(props: any) {
  const addActivity = () => {
    if (props.state.activity.length === 0) {
      showMessage({
        message: "🔔 Error",
        description: "Please Fill The Input",
        type: "danger",
      });
    } else {
      firebase
        .database()
        .ref("/activity")
        .push({
          activity: props.state.activity,
          isDone: false,
        })
        .then(() => {
          showMessage({
            message: "🔔 Success",
            description: "Your Task Has Been Added",
            type: "success",
            animationDuration: 300,
            duration: 2000,
          });
          let ambildata = firebase.database().ref("/activity");
          ambildata.once("value").then((snapshot) => {
            props.setList(snapshot.val());
          });

          props.state.setActivity("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // let ambilData2 = firebase.database().ref('/contoh')
  // if (ambilData2) {
  //   ambilData2.once('value').then(snapshot => {
  //   setList(snapshot.val())
  // })
  //   array = Object.keys(list)
  // }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What you want todo"
        onChangeText={(text) => props.state.setActivity(text)}
        value={props.state.activity}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => addActivity()}>
        <Text> Create Task </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 14,
    paddingLeft: 20,
    marginBottom: 10,
    borderColor: "black",
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  button: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
  },
});
