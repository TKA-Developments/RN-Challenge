import * as React from "react";
import { AsyncStorage, Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import TodoList from "../components/TodoList";
import { TodoItems } from "../types";

export default function TabOneScreen() {
  var Datastore = require("react-native-local-mongodb");
  var db = new Datastore({
    filename: "asyncStorageKey",
    storage: AsyncStorage,
    autoload: true,
  });
  const handleAddItem = () => {
    db.insert({
      title: "Task 1",
      completed: true,
    });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
    console.log(todoItems);
  };
  const handleResetAll = () => {
    db.remove({}, { multi: true });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
    console.log(todoItems);
  };
  const deleteItem = (id: string) => {
    db.remove({ _id: id });
    db.find({}, function (_err: any, docs: any) {
      setTodoItems(docs);
    });
    console.log(todoItems);
  };

  const [todoItems, setTodoItems] = React.useState<Array<TodoItems>>([]);
  React.useEffect(() => {
    db.find({}, function(_err: any, docs: any) {
      setTodoItems(docs);
    });
    
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab sOneS</Text>
      <Button onPress={handleAddItem} title="Add Item" color="blue" />
      <Button onPress={handleResetAll} title="Delete All" color="red" />
      <TodoList
        deleteItem={deleteItem}
        todoItems={todoItems}
        // setTodoItems={setTodoItems}
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
