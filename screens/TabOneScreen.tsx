import * as React from "react";
import { AsyncStorage, Button, StyleSheet } from "react-native";
import AddTodoItem from "../components/AddTodoItem";

import { Text, View } from "../components/Themed";
import TodoList from "../components/TodoList";
import TodoMenu from "../components/TodoMenu";
import { FilterOptions, TodoItems } from "../types";

export default function TabOneScreen() {
  var Datastore = require("react-native-local-mongodb");
  var db = new Datastore({
    filename: "asyncStorageKey",
    storage: AsyncStorage,
    autoload: true,
  });
  const addItem = (title: string) => {
    db.insert({
      title,
      completed: false,
    });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const deleteItem = (id: string) => {
    db.remove({ _id: id });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const editItem = (id: string, text: string) => {
    db.update({ _id: id }, { $set: { title: text } });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const toggleItemCompletion = (id: string) => {
    db.find({ _id: id }, function (_err: any, docs: any) {
      db.update({ _id: id }, { $set: { completed: !docs[0].completed } });
      db.find({}, function (_err: any, docs: any) {
        setTodoItems(docs);
      });
    });
  };

  const [toggleDelete, setToggleDelete] = React.useState(false);
  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [todoItems, setTodoItems] = React.useState<Array<TodoItems>>([]);
  const [filterOptions, setFilterOptions] = React.useState<FilterOptions>({completed: true, uncompleted: true, regexSting: ""});
  React.useEffect(() => {
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab sOneS</Text>
      <AddTodoItem addItem={addItem} />
      <TodoMenu
        filterOptions={filterOptions}
        toggleDelete={toggleDelete}
        toggleEdit={toggleEdit}
        setFilterOptions={setFilterOptions}
        setToggleEdit={setToggleEdit}
        setToggleDelete={setToggleDelete}
      />
      <TodoList
        deleteItem={deleteItem}
        editItem={editItem}
        todoItems={todoItems}
        toggleItemCompletion={toggleItemCompletion}
        toggleDelete={toggleDelete}
        toggleEdit={toggleEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
