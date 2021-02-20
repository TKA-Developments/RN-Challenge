import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import AllToDoList from "../components/AllToDoList";
import useColorScheme from "../hooks/useColorScheme";
import {ITodo} from  "../types"

const toDo: ITodo[] = [
  {
    done: false,
    description: "Berak di kosan",
    date: new Date(),
  },
  {
    done: false,
    description:
      "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
    date: new Date(),
  },
  {
    done: false,
    description: "Mandi di sumur",
    date: new Date(),
  },
];

export default function AllScreen() {
  const [todos, setTodos] = useState<ITodo[]>(toDo);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setTodos([
            ...todos,
            {
              done: false,
              description: "Gigit kuku",
              date: new Date(),
            },
          ]);
        }}
      >
        <MaterialIcons
          name="add-box"
          size={35}
          color={useColorScheme() === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <AllToDoList todos={todos} setTodos={setTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    // borderWidth: 2,
    // borderColor: "green",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
});
