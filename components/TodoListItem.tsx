import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TodoListItemParamList } from "../types";

export default function TodoListItem({
  title,
  id,
  onPressDelete,
}: TodoListItemParamList) {
  return (
    <View key={id} style={styles.item}>
      <Text>{title}</Text>
      <Button title="Del" onPress={() => onPressDelete(id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
