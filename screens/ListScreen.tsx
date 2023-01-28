import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import ListItem from "../components/list-item";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ListScreen() {
  const nav = useNavigation();

  const onPress = () => {
    nav.navigate("AddList");
  };

  const [list, setList] = useState([
    {
      id: "1",
      title: "Monday Todos",
      color: "green",
    },
    {
      id: "2",
      title: "Tuesday Todos",
      color: "red",
    },
    {
      id: "3",
      title: "Wednesday Todos",
      color: "blue",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My List</Text>

      <FlatList
        data={list}
        renderItem={({ item }) => <ListItem list={item} />}
        style={{ width: "100%" }}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnAdd} onPress={onPress}>
          <MaterialIcons name="add" size={24} color="darkslategrey" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 32,
    color: "darkslategrey",
  },
  btnContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnAdd: {
    padding: 15,
    backgroundColor: "darkseagreen",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
