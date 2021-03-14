import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../Themed";
import { InputForm } from "../../types";

const Input = ({ label, value, onChange }: InputForm) => {
  const [input, setInput] = useState(false);

  return (
    <View>
      {!input && (
        <Text
          onPress={() => setInput(true)}
          style={label === "Activity" ? styles.label : styles.descLabel}
        >
          Add {label}
        </Text>
      )}
      {input && (
        <TextInput
          autoFocus={true}
          multiline={label === "Activity" ? false : true}
          numberOfLines={label === "Activity" ? 1 : 3}
          style={
            label === "Activity"
              ? { ...styles.input, fontWeight: "bold", fontSize: 27 }
              : styles.input
          }
          placeholder={` ${label}`}
          value={value}
          onChangeText={(text) => onChange(label, text)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 27, fontWeight: "bold", color: "grey" },
  descLabel: { fontSize: 20, marginVertical: 15, color: "grey" },
  input: {
    fontSize: 20,
    color: "black",
    borderRadius: 15,
    minHeight: 50,
    paddingHorizontal: 15,
  },
});

export default Input;
