import React from "react";
import { StyleSheet } from "react-native";

import { View } from "./Themed";
import ToDos from "./ToDos";
import { todoProps } from "../types";

export default function ToDoList({
  todos,
  setTodos,
  toggleEditModal,
  screen,
  setDone,
  removeTodo,
}: todoProps) {
  return (
    <View style={styles.container}>
      <ToDos
        todos={todos}
        setTodos={setTodos}
        toggleEditModal={toggleEditModal}
        screen={screen}
        setDone={setDone}
        removeTodo={removeTodo}
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
