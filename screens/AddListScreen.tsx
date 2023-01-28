import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import InputDataAddList from "../components/list-add-item";

export default class AddListScreen extends Component {
  render() {
    return (
      <View style={styles.pages}>
        <Text style={styles.title}>Create New List</Text>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <InputDataAddList label="Title" placeholder="Input list title" />
          <InputDataAddList label="Color" placeholder="Choose list color" />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.btnSubmitText}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 32,
    color: "darkslategrey",
  },
  btnSubmit: {
    backgroundColor: "darkseagreen",
    padding: 8,
    borderRadius: 5,
    marginTop: 32,
  },
  btnSubmitText: {
    textAlign: "center",
    fontSize: 16,
    color: "darkslategrey",
    fontWeight: "bold",
  },
});
