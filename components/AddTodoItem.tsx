import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { AddTodoItemParamList } from "../types";
import Colors from "../constants/Colors";
import { SvgXml } from "react-native-svg";

export default function AddTodoItem({ addItem }: AddTodoItemParamList) {
  const [text, setText] = React.useState("");
  return (
    <View style={styles.col}>
      <View style={styles.row}>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => setText(t)}
          value={text}
          placeholder="Enter task title here..."
          placeholderTextColor={"lightslategrey"}
        />
        <SvgXml
          xml={`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path
             fill=${"black"} 
          d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/></svg>`}
          width="40"
          height="40"
          onPress={() => {
            addItem(text);
            setText("");
          }}
          style={{ backgroundColor: "limegreen" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flexDirection: "column",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputText: {
    height: 40,
    width: 250,
    color: Colors.dark.text,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
