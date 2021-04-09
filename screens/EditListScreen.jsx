import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.blue);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>List Name</Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={setTitle}
          placeholder={"New list name"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.darkGray,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
