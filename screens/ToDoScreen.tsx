import * as React from "react";
import { AsyncStorage, Button, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import TodoList from "../components/TodoList";
import TodoMenu from "../components/TodoMenu";
import { FilterOptions, TodoItems } from "../types";

export default function ToDoScreen() {
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
    db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const deleteItem = (id: string) => {
    db.remove({ _id: id });
    db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const editItem = (id: string, text: string) => {
    db.update({ _id: id }, { $set: { title: text } });
    db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  };
  const toggleItemCompletion = (id: string) => {
    db.find({ _id: id }, function (_err: any, docs: any) {
      db.update({ _id: id }, { $set: { completed: !docs[0].completed } });
      db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
        setTodoItems(docs);
      });
    });
  };

  const getDbQuery = (fo: FilterOptions) => {
    return {
      ...(fo.completed && !fo.incompleted && { completed: true }),
      ...(!fo.completed && fo.incompleted && { completed: false }),
      ...(!fo.completed && !fo.incompleted && { completed: null }),
      ...(fo.regexString.length > 0 && {
        title: { $regex: new RegExp(fo.regexString) },
      }),
    };
  };

  const [toggleDelete, setToggleDelete] = React.useState(false);
  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [todoItems, setTodoItems] = React.useState<Array<TodoItems>>([]);
  const [filterOptions, setFilterOptions] = React.useState<FilterOptions>({
    completed: false,
    incompleted: true,
    regexString: "",
  });
  React.useEffect(() => {
    db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  }, []);
  React.useEffect(() => {
    db.find(getDbQuery(filterOptions), function (_err: any, docs: any) {
      setTodoItems(docs);
    });
  }, [filterOptions]);

  return (
    <View style={styles.container}>
      <TodoMenu
        filterOptions={filterOptions}
        toggleDelete={toggleDelete}
        toggleEdit={toggleEdit}
        setFilterOptions={setFilterOptions}
        setToggleEdit={setToggleEdit}
        setToggleDelete={setToggleDelete}
        addItem={addItem}
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
});
