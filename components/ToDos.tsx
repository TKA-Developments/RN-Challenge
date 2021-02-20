import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "./Themed";

interface IToDo {
  done: boolean;
  description: string;
}
[];

export default function ToDos({ toDoList }: { toDoList: IToDo[] }) {
  return (
    <FlatList
      keyExtractor={(e, i) => i.toString()}
      data={toDoList}
      renderItem={({ item }) => {
        return <Text>{item.description}</Text>;
      }}
    />
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
