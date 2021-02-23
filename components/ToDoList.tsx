import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";
import ToDos from "./ToDos";
import { ITodo } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ToDoList({
  todos,
  setTodos,
  toggleEditModal,
  screen,
}: {
  todos: ITodo[];
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        done: boolean;
        description: string;
        date: string;
      }[]
    >
  >;
  toggleEditModal: (index: number) => void;
  screen: "all" | "completed" | "incompleted";
}) {
  // useEffect(() => {
  //   setToDosFromAsyncStorage();
  // }, []);

  // const setToDosFromAsyncStorage = async () => {
  //   try {
  //     console.log(todos);
  //     const result = await AsyncStorage.getItem("todos");
  //     console.log(result);
  //     if (result != null) {
  //       setTodos(JSON.parse(result));
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <ToDos
        todos={todos}
        setTodos={setTodos}
        toggleEditModal={toggleEditModal}
        screen={screen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 6,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "cyan",
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
});
