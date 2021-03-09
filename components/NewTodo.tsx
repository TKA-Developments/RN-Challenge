import * as React from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import WarningImage from "../assets/images/warning.jpg";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { editTodo, addTodo } from "../redux/todoslice";

import { Text, View } from "../components/Themed";
import MyButton from "./MyButton";

export default function NewTodo(props: {
  toggle?: any;
  setShowMessage?: any;
  showMessageToggle?: any;
  selectedDate?: any;
  defaultValue?: string;
  edit?: boolean;
  id?: any;
  editState?: any;
}) {
  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo.value);

  const [state, setState] = React.useState({
    task: props.edit ? props.defaultValue || "" : "",
    time: props.selectedDate,
    id: props.edit ? props.id || "" : "",
  });

  const submitTodo = async () => {
    if (state.task) {
      if (props.edit) {
        dispatch(editTodo(state));
        props.editState({ edit: false });
      } else {
        dispatch(addTodo(state));
      }
      props.toggle();
      props.setShowMessage({
        title: "Nice!",
        message: "Good luck and always to check back your todo list.",
        show: true,
      });
    } else {
      props.setShowMessage({
        title: "ooops!",
        message: "You need to fill the form correctly.",
        image: WarningImage,
        show: true,
      });
    }
  };

  const onChangeInput = (text, type) => {
    setState({ ...state, [type]: text });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginLeft: 8, marginTop: 8, marginBottom: 8 }}
          onPress={() => {
            props.toggle();
            props.editState({
              id: "",
              task: "",
              edit: false,
            });
          }}
        />
        <Text style={styles.title}>
          {props.edit ? "Edit My" : "Add New"} Todo
        </Text>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          value={state.task}
          onChangeText={(text) => {
            onChangeInput(text, "task");
          }}
          placeholder="New Activity"
          placeholderTextColor="black"
        />
        <MyButton text="Submit" onPress={submitTodo} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    marginBottom: 16,
    padding: 8,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 24,
  },
});
