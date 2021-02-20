import * as React from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import AllToDoList from "../components/AllToDoList";
import useColorScheme from "../hooks/useColorScheme";

export default function AllScreen() {
  const a = [1, 2, 3];
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialIcons
          name="add-box"
          size={35}
          color={useColorScheme() === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
      <AllToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
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
