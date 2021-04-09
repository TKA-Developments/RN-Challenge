import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TodoItem from "../components/TodoItem";
import Colors from "../constants/Colors";

const renderAddListIcon = (addItem) => {
  return (
    <TouchableOpacity
      onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })}
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [toDoItems, setToDoItems] = useState([]);

  const addItemToList = (item) => {
    toDoItems.push(item);
    setToDoItems([...toDoItems]);
  };

  const removeItemFromList = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  const updateItemFromList = (index, item) => {
    toDoItems[index] = item;
    setToDoItems([...toDoItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToList),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
          return (
            <TodoItem
              text={text}
              isChecked={isChecked}
              isNewItem={isNewItem}
              onChecked={() => {
                const toDoItem = toDoItems[index];
                toDoItem.isChecked = !isChecked;
                updateItemFromList(index, toDoItem);
              }}
              onChangeText={(newText) => {
                const toDoItem = toDoItems[index];
                toDoItem.text = newText;
                updateItemFromList(index, toDoItem);
              }}
              onDelete={() => {
                removeItemFromList(index);
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
});
