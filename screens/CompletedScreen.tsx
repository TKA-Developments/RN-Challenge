import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { Text, View } from "../components/Themed";
import ToDoList from "../components/ToDoList";
import EditModal from "../utils/EditModal";
import { ITodo } from "../types";
import { TodoContext } from "../provider/TodoProvider";

export default function CompletedScreen() {
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [inpDescription, setInpDescription] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);

  const toggleEditModal = (index: number) => {
    setEditIndex(index);
    setEditModalVisible(!isEditModalVisible);
  };

  return (
    <TodoContext.Consumer>
      {({ todos, setTodos, editTodo, setDone, removeTodo }) =>
        todos.filter((e: ITodo) => {
          return e.done;
        }).length > 0 ? (
          <View style={styles.container}>
            <ToDoList
              todos={todos}
              setTodos={setTodos}
              toggleEditModal={toggleEditModal}
              screen="completed"
              setDone={setDone}
              removeTodo={removeTodo}
            />
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
        ) : (
          <View style={styles.container}>
            <Text style={{ bottom: 12 }}>
              Mark some Todos as done to see Todos here
            </Text>
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
    paddingTop: 30,
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
