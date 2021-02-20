import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import ToDos from "./ToDos";

const toDo = [
  {
    done: true,
    description: "as",
    date: new Date(),
  },
];

export default function AllToDoList() {
  return (
    <View style={styles.container}>
      <ToDos toDoList={toDo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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
