import { Text, View, StyleSheet, Alert } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import InputDataAddList from "../components/list-add-item";

export default class AddListScreen extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      title: "",
      color: "",
    };
  }

  onChangeText = (state, value: any) => {
    this.setState({
      [state]: value,
    });
  };

  onSubmit = () => {
    if (this.state.title && this.state.color) {
      const listRef = FIREBASE.database().ref("list");

      const list = {
        title: this.state.title,
        color: this.state.color,
      };

      listRef
        .push(list)
        .then((data) => {
          Alert.alert("Yeay", `Successfully create ${list.title}`);
          this.props.navigation.replace("List");
        })
        .catch((error: any) => {
          console.log("Error : ", error);
        });
    } else {
      Alert.alert("Error", "Please input list title and color.");
    }
  };

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
          <InputDataAddList
            label="Title"
            placeholder="Input list title"
            onChangeText={this.onChangeText}
            value={this.state.title}
            state="title"
          />
          <InputDataAddList
            label="Color"
            placeholder="Choose list color"
            onChangeText={this.onChangeText}
            value={this.state.color}
            state="color"
          />

          <TouchableOpacity style={styles.btnSubmit} onPress={this.onSubmit}>
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
