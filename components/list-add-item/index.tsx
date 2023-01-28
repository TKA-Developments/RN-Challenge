import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface InputDataAddListParameters {
  label: string;
  placeholder: string;
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
    fontSize: 16,
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "darkgrey",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
});
