// import firebase from "firebase/compat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import TodoItem from "../components/todo-item";

export default function TodosScreen() {
  const [filterTodos, setFilterTodos] = useState("");
  const [titleList, setTitleList] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "0",
      content: " ",
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
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.title}
          value={titleList}
          onChangeText={setTitleList}
          placeholder={"New List"}
        />

        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={32}
            color="darkslategrey"
          />
        </TouchableOpacity>
      </View>

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
    padding: 16,
    marginTop: 32,
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "85%",
    height: 40,
    fontSize: 32,
    fontWeight: "bold",
    color: "darkslategrey",
  },
});
