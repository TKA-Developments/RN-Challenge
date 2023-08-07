import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TodoListItemParamList } from "../types";

export default function TodoListItem({
  title,
  id,
  onPressDelete,
  completed,
  onPressToggleCompletion,
}: TodoListItemParamList) {
  return (
    <View
      key={id}
      style={[
        styles.item,
        completed ? styles.checkedItem : styles.uncheckedItem,
      ]}
    >
      <View style={styles.flexRow}>
        <Button
          title={completed ? "Uncheck" : "Check"}
          onPress={() => onPressToggleCompletion(id)}
        />
        <Text>{title}</Text>
      </View>
      <View style={styles.flexRow}>
        <Button title="Del" onPress={() => onPressDelete(id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkedItem: {
    backgroundColor: "#008222",
  },
  uncheckedItem: {
    backgroundColor: "#f9ffff",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
