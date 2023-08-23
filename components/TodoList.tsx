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
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Text style={{ color: "gray" }}>No task found</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    width: "100%",
  },
});
