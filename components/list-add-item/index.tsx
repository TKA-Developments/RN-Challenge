import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface InputDataAddListParameters {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  state: any;
}

const InputDataAddList = ({
  label,
  placeholder,
  onChangeText,
  value,
  state,
}: InputDataAddListParameters) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={(text) => onChangeText(state, text)}
        value={value}
      />
    </>
  );
};

export default InputDataAddList;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginTop: 8,
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "darkgrey",
    borderRadius: 5,
    padding: 12,
    marginVertical: 4,
  },
});