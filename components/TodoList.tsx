import React from "react";
import { FlatList } from "react-native";
import { TodoListParamList } from "../types";
import TodoListItem from "./TodoListItem";

export default function TodoList({ todoItems, setTodoItems, deleteItem }:TodoListParamList) {
  return (
    <FlatList
      data={todoItems}
      renderItem={({ item }) => (
        <TodoListItem
          title={item._id}
          id={item._id}
          onPressDelete={() => deleteItem(item._id)}
        />
      )}
    />
  );
}
