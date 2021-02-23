import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View } from "../components/Themed";
import ToDoList from "../components/ToDoList";
import useColorScheme from "../hooks/useColorScheme";
import AddModal from "../utils/AddModal";
import EditModal from "../utils/EditModal";
import { ITodo } from "../types";
import { TodoContext } from "../provider/TodoProvider";

export default function AllScreen() {
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [inpDescription, setInpDescription] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);
  const colorScheme = useColorScheme();

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = (index: number) => {
    setEditIndex(index);
    setEditModalVisible(!isEditModalVisible);
  };

  // const addTodo = (inp:string) => {
  //   setTodos([...todos, {done:false,description:inp,date:new Date()}])
  // }

  // const editTodo = (inp:string, index:number) => {
  //   todos[index].description = inp
  //   setTodos([...todos])
  // }

  return (
    <TodoContext.Consumer>
      {({ todos, setTodos, addTodo, editTodo, clearTodos }) => {
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
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <ToDoList
              todos={todos}
              setTodos={setTodos}
              toggleEditModal={toggleEditModal}
              screen="all"
            />
            <Modal testID={"modal"} isVisible={isAddModalVisible}>
              <AddModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleAddModal();
                }}
                addTodo={addTodo}
              />
            </Modal>
            <Modal testID={"modal"} isVisible={isEditModalVisible}>
              <EditModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleEditModal(editIndex);
                }}
                editTodo={editTodo}
                editIndex={editIndex}
              />
            </Modal>
          </View>
        );
      }}
    </TodoContext.Consumer>
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
  },
});
