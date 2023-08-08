import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TodoListParamList } from "../types";
import { Text } from "./Themed";
import TodoListItem from "./TodoListItem";

export default function TodoList({
  todoItems,
  deleteItem,
  editItem,
  toggleItemCompletion,
  toggleDelete,
  toggleEdit,
}: TodoListParamList) {
  return (
    // <View>

    <FlatList
      style={styles.container}
      data={todoItems}
      renderItem={({ item }) => (
        <TodoListItem
          title={item.title}
          id={item._id}
          key={item._id}
          completed={item.completed}
          onPressDelete={() => deleteItem(item._id)}
          editItem={editItem}
          onPressToggleCompletion={() => toggleItemCompletion(item._id)}
          toggleDelete={toggleDelete}
          toggleEdit={toggleEdit}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <Text style={{color:"gray"}}>No task found</Text>
      }
    />
    // </View>
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
