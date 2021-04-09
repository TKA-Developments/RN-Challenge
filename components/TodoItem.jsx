import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import Checkbox from "./Checkbox";

export default ({ text, isChecked, onChecked, onChangeText }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Checkbox isChecked={isChecked} onChecked={onChecked} />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setIsEditMode(true)}
        >
          {isEditMode ? (
            <TextInput
              underlineColorAndroid={"transparent"}
              selectionColor={"transparent"}
              autoFocus={true}
              value={text}
              onChangeText={onChangeText}
              placeholder={"Add new item here"}
              onSubmitEditing={() => {}}
              maxLength={30}
              style={[styles.input, { outline: "none" }]}
              onBlur={() => setIsEditMode(false)}
            />
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color: isChecked ? Colors.lightGray : Colors.black,
                  textDecoration: isChecked ? "line-through" : "none",
                },
              ]}
            >
              {text}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 16,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 25,
    fontSize: 16,
  },
  text: {
    padding: 3,
    fontSize: 16,
  },
});
