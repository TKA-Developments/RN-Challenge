import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { TodoListItemParamList } from "../types";

export default function TodoListItem({
  title,
  id,
  onPressDelete,
  editItem,
  onPressToggleCompletion,
  completed,
  toggleDelete,
  toggleEdit,
}: TodoListItemParamList) {
  const [text, setText] = React.useState(title);
  const [isEditing, setIsEditing] = React.useState(true);
  React.useEffect(() => {
    setIsEditing(true);
  }, [toggleEdit]);

  return (
    <View
      key={id}
      style={[
        styles.item,
        completed ? styles.checkedItem : styles.uncheckedItem,
      ]}
    >
      <View style={styles.flexRow}>
        {toggleEdit ? (
          <TextInput
            style={{
              height: 40,
              paddingLeft: 6,
              backgroundColor: "#d3d3d3",
              width: "78%",
            }}
            value={text}
            onChangeText={(t: string) => {
              setText(t);
              setIsEditing(true);
            }}
            selectionColor={"blue"}
          />
        ) : (
          <Text
            style={{
              minHeight: 40,
              paddingLeft: 6,
              width: "78%",
              textAlignVertical: "center",
            }}
          >
            {title}
          </Text>
        )}
      </View>
      <View style={styles.flexRow}>
        {!toggleDelete && !toggleEdit && (
          <Button
            title={completed ? "Uncheck" : "Check"}
            onPress={() => onPressToggleCompletion(id)}
            color={completed ? "grey" : "green"}
          />
        )}
        {toggleDelete && !toggleEdit && (
          <Button
            title="Delete"
            onPress={() => onPressDelete(id)}
            color="red"
          />
        )}
        {!toggleDelete && toggleEdit && (
          <Button
            title={isEditing ? "Save Edit" : "Saved"}
            onPress={() => {
              editItem(id, text);
              setIsEditing(false);
            }}
            color={isEditing ? "blue" : "gray"}
          />
        )}
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
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
