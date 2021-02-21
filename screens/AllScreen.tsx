import React, { useState } from "react";
import { StyleSheet, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { Text, View } from "../components/Themed";
import AllToDoList from "../components/AllToDoList";
import useColorScheme from "../hooks/useColorScheme";
import AddModal from "../utils/AddModal"
import {ITodo} from  "../types"

const toDo: ITodo[] = [
  {
    done: false,
    description: "Berak di kosan",
    date: new Date(),
  },
  {
    done: false,
    description:
      "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
    date: new Date(),
  },
  {
    done: false,
    description: "Mandi di sumur",
    date: new Date(),
  },
];

export default function AllScreen() {
  const [todos, setTodos] = useState<ITodo[]>(toDo);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [inpDescription, setInpDescription] = useState<string>("")

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const addTodo = (inp:string) => {
    setTodos([...todos, {done:false,description:inp,date:new Date()}])
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.addButton}
        onPress={() => {
          toggleModal();
        }}
      >
        <MaterialIcons
          name="add-box"
          size={35}
          color={useColorScheme() === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <AllToDoList todos={todos} setTodos={setTodos} />
      <Modal testID={'modal'} isVisible={isModalVisible}>
        <AddModal inpDescription={inpDescription} setInpDescription={setInpDescription} onPress={() => {toggleModal()}} addTodo={addTodo} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  addButton: {
    padding: 15,
    // borderWidth:2,
    // borderColor:'blue'
  }
});
