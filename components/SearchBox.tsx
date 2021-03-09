import * as React from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { View } from "./Themed";

export default function SearchBox(props: {
  inputKey?: any;
  handleChangeText?: any;
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.textInput}>
        <AntDesign
          name="search1"
          size={24}
          color="black"
          style={{ marginRight: 8 }}
        />
        <TextInput
          value={props.inputKey}
          onChangeText={(t) => props.handleChangeText(t)}
          placeholder="Search my activity"
          placeholderTextColor="black"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#C1D1DE",
    borderRadius: 16,
    flexDirection: "row",
  },
});
