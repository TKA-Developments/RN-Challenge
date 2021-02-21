import React, { useState } from "react";
import { StyleSheet, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { Text, View } from "../components/Themed";
import AllToDoList from "../components/AllToDoList";
import useColorScheme from "../hooks/useColorScheme";
import AddModal from "../utils/AddModal"
import EditModal from "../utils/EditModal"
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
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [inpDescription, setInpDescription] = useState<string>("")
  const [editIndex, setEditIndex] = useState<number>(0)

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = (index:number) => {
    console.log(index)
    setEditIndex(index)
    setEditModalVisible(!isEditModalVisible)
  }
  
  const addTodo = (inp:string) => {
    setTodos([...todos, {done:false,description:inp,date:new Date()}])
  }

  const editTodo = (inp:string, index:number) => {
    todos[index].description = inp
    setTodos([...todos])
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.addButton}
        onPress={() => {
          toggleAddModal();
        }}
      >
        <MaterialIcons
          name="add-box"
          size={35}
          color={useColorScheme() === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <AllToDoList todos={todos} setTodos={setTodos} toggleEditModal={toggleEditModal}/>
      <Modal testID={'modal'} isVisible={isAddModalVisible}>
        <AddModal inpDescription={inpDescription} setInpDescription={setInpDescription} onPress={() => {toggleAddModal()}} addTodo={addTodo} />
      </Modal>
      <Modal testID={'modal'} isVisible={isEditModalVisible}>
        <EditModal inpDescription={inpDescription} setInpDescription={setInpDescription} onPress={() => {toggleEditModal(editIndex)}} editTodo={editTodo} editIndex={editIndex}/>
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
