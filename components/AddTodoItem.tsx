import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { AddTodoItemParamList } from "../types";
import Colors from "../constants/Colors";

export default function AddTodoItem({ addItem }: AddTodoItemParamList) {
  const [text, setText] = React.useState("");
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.inputText}
        onChangeText={(t) => setText(t)}
        value={text}
      />
      <Button
        title="Add Item"
        onPress={() => {
          addItem(text);
          setText("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  inputText: {
    height: 40,
    width: "70%",
    color: Colors.dark.text,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
