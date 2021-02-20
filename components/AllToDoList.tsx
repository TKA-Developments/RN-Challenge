import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import ToDos from "./ToDos";
import { ITodo } from "../types";
export default function AllToDoList({
  todos,
  setTodos,
}: {
  todos: ITodo[],
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        done: boolean,
        description: string,
        date: Date,
      }[]
    >
  >,
}) {
  return (
    <View style={styles.container}>
      <ToDos todos={todos} setTodos={setTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 15,
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
