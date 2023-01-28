// import firebase from "firebase/compat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TodoItem from "../components/todo-item";

export default function TodosScreen() {
  const [titleList, setTitleList] = useState("");
  const [addData, setAddData] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "0",
      content: "learn math",
      isDone: false,
    },
    {
      id: "1",
      content: "do homework",
      isDone: false,
    },
    {
      id: "2",
      content: "dinner with emma",
      isDone: false,
    },
    {
      id: "3",
      content: "pay bills",
      isDone: false,
    },
  ]);

  const addTodo = (atIndex: number) => {
    const newTodos = [...todos];
    newTodos.splice(atIndex, 0, {
      id: newTodos.length.toString(),
      content: "",
      isDone: false,
    });
    setTodos(newTodos);
  };

  const deleteTodo = (atIndex: number) => {
    const newTodos = [...todos];
    if (newTodos.length > 1) {
      newTodos.splice(atIndex, 1);
    }
    setTodos(newTodos);
  };

  // fetch data
  // useEffect(() => {
  //   todoRef
  //   .onSnapshot(
  //     querySnapshot => {
  //       const todos = []
  //       querySnapshot.forEach((doc) => {
  //         const {heading} = doc.data()
  //         todos.push({
  //           id:doc.id,
  //           heading,
  //         })
  //       })
  //     }
  //   )
  // })

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      // keyboardVerticalOffset={47}
      enabled
    >
      <TextInput
        style={styles.title}
        value={titleList}
        onChangeText={setTitleList}
        placeholder={"New List"}
      />

      <FlatList
        removeClippedSubviews={false}
        data={todos}
        renderItem={({ item, index }) => (
          <TodoItem
            todo={item}
            onSubmit={() => addTodo(index + 1)}
            deleteTodo={() => deleteTodo(index)}
          />
        )}
        style={{ width: "100%" }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 12,
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 32,
  },
});
