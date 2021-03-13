import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../Themed";
import { InputForm } from "../../types";

const Input = ({ label, value, onChange }: InputForm) => {
  return (
    <View>
      <Text style={label === "Title" ? styles.titleLabel : styles.descLabel}>
        {label}
      </Text>
      <TextInput
        multiline={label === "Title" ? false : true}
        numberOfLines={label === "Title" ? 1 : 3}
        style={styles.input}
        placeholder={`Activity ${label}`}
        value={value}
        onChangeText={(text) => onChange(label, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleLabel: { fontSize: 27, fontWeight: "bold" },
  descLabel: { fontSize: 20, marginTop: 15 },
  input: {
    fontSize: 20,
    color: "grey",
    borderWidth: 1,
    borderRadius: 15,
    minHeight: 50,
    paddingHorizontal: 15,
  },
});

export default Input;
