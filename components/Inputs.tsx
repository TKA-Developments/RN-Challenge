import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../constants/firebase";
export function Inputs() {
  const [activity, setActivity] = useState("");
  const addActivity = () => {
    firebase
      .database()
      .ref("/activity")
      .push({
        activity: activity,
        isDone: false,
      })
      .then(() => {
        alert("Sukses add data");
        setActivity("");
      })
      .catch((err) => {
        alert(err);
      });
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
        onChangeText={(text) => setActivity(text)}
        value={activity}
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
