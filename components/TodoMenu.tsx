import React from "react";
import { View , StyleSheet, Button } from "react-native";
import { TodoMenuParamList } from "../types";

export default function TodoMenu({
  filterOptions,
  toggleDelete,
  toggleEdit,
  setFilterOptions,
  setToggleEdit,
  setToggleDelete,
}: TodoMenuParamList) {
  return (
    <View>
      <Button
        onPress={() => {
          setToggleEdit(!toggleEdit);
          setToggleDelete(false);
        }}
        title="Toggle Edit"
        color="blue"
      />
      <Button
        onPress={() => {
          setToggleDelete(!toggleDelete);
          setToggleEdit(false);
        }}
        title="Toggle Delete"
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 20,
    marginVertical: 8,
    width: "100%",
  },
});
