import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { Text, View } from "../components/Themed";
import ToDoList from "../components/ToDoList";
import useColorScheme from "../hooks/useColorScheme";
import AddModal from "../utils/AddModal";
import EditModal from "../utils/EditModal";
import ClearModal from "../utils/ClearModal";
import { TodoContext } from "../provider/TodoProvider";

export default function AllScreen() {
  const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isClearModalVisible, setClearModalVisible] = useState<boolean>(false);
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

  const toggleClearModal = () => {
    setClearModalVisible(!isClearModalVisible);
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
      {({
        todos,
        setTodos,
        addTodo,
        editTodo,
        clearTodos,
        setDone,
        removeTodo,
      }) =>
        todos.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.topBarContainer}>
              <View>
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
              </View>
              <View style={{ position: "absolute", right: 20 }}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    toggleClearModal();
                  }}
                >
                  {/* <MaterialIcons
                    name="add-box"
                    size={35}
                    color={colorScheme === "dark" ? "white" : "black"}
                  /> */}
                  <FontAwesome5 name="times-circle" size={24} color="#FC3158" />
                </TouchableOpacity>
              </View>
            </View>
            {/* {todos.length > 0 ? (
            <View> */}
            <ToDoList
              todos={todos}
              setTodos={setTodos}
              toggleEditModal={toggleEditModal}
              screen="all"
              removeTodo={removeTodo}
              setDone={setDone}
            />
            <Text
              style={styles.tipText}
              lightColor="#7a7a7a"
              darkColor="rgba(255,255,255,0.6)"
            >
              Tip: Tap on a Todo to edit its description
            </Text>
            {/* </View>
          ) : (
            <Text style={{ bottom: 30 }}>
              Tap the icon above to start adding Todos! 😃
            </Text>
          )} */}
            <Modal testID={"add-modal"} isVisible={isAddModalVisible}>
              <AddModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleAddModal();
                }}
                addTodo={addTodo}
              />
            </Modal>
            <Modal testID={"edit-modal"} isVisible={isEditModalVisible}>
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
            <Modal testID={"clear-modal"} isVisible={isClearModalVisible}>
              <ClearModal
                onPress={() => {
                  toggleClearModal();
                }}
                clearTodos={clearTodos}
              />
            </Modal>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.topBarContainer}>
              <View>
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
              </View>
              <View style={{ position: "absolute", right: 20 }}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    toggleClearModal();
                  }}
                >
                  {/* <MaterialIcons
                    name="add-box"
                    size={35}
                    color={colorScheme === "dark" ? "white" : "black"}
                  /> */}
                  <FontAwesome5 name="times-circle" size={24} color="#FC3158" />
                </TouchableOpacity>
              </View>
            </View>
            {/* {todos.length > 0 ? (
            <View> */}
            {/* <ToDoList
            todos={todos}
            setTodos={setTodos}
            toggleEditModal={toggleEditModal}
            screen="all"
          />
          <Text
            style={styles.tipText}
            lightColor="#7a7a7a"
            darkColor="rgba(255,255,255,0.6)"
          >
            Tip: Tap on a Todo to edit its description
          </Text> */}
            {/* </View>
          ) : ( */}
            <View style={styles.container}>
              <Text style={{ bottom: 30 }}>
                Tap the icon above to start adding Todos! 😃
              </Text>
            </View>
            {/* )} */}
            <Modal testID={"add-modal"} isVisible={isAddModalVisible}>
              <AddModal
                inpDescription={inpDescription}
                setInpDescription={setInpDescription}
                onPress={() => {
                  toggleAddModal();
                }}
                addTodo={addTodo}
              />
            </Modal>
            <Modal testID={"edit-modal"} isVisible={isEditModalVisible}>
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
            <Modal testID={"clear-modal"} isVisible={isClearModalVisible}>
              <ClearModal
                onPress={() => {
                  toggleClearModal();
                }}
                clearTodos={clearTodos}
              />
            </Modal>
          </View>
        )
      }
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
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  addButton: {
    padding: 15,
    alignSelf: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },
  clearButton: {
    alignSelf: "flex-end",
    // right: 0,
    padding: 15,
    // borderWidth: 2,
    // borderColor: "red",
  },
  tipText: {
    fontSize: 11,
    bottom: 10,
    // borderWidth: 2,
    // borderColor: "green",
  },
});
