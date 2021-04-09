import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";

export default () => {
  const [isCreateMode, setIsCreateMode] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TodoApp</Text>
      <View style={{ flex: 1 }}></View>

      <Button
        onPress={() => {}}
        buttonStyle={{ backgroundColor: Colors.red }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  header: {
    fontSize: 72,
    color: Colors.red,
    alignSelf: "center",
  },
});
