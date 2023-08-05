import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TodoListParamList } from "../types";
import TodoListItem from "./TodoListItem";

export default function TodoList({ todoItems, deleteItem }: TodoListParamList) {
  return (
    <FlatList
      style={styles.container}
      data={todoItems}
      renderItem={({ item }) => (
        <TodoListItem
          title={item.title}
          id={item._id}
          key={item._id}
          onPressDelete={() => deleteItem(item._id)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 20,
    marginVertical: 8,
    width: "100%",
  },
});
