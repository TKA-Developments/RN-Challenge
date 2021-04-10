import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ListItem from "../components/ListItem";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const renderAddListIcon = (navigation, addItemToList) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 4 }}
        onPress={() =>
          navigation.navigate("Settings", { saveChanges: addItemToList })
        }
      >
        <Ionicons name="settings" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: 8 }}
        onPress={() =>
          navigation.navigate("Edit", { saveChanges: addItemToList })
        }
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ({ navigation }) => {
  const [lists, setLists] = useState([
    { title: "Work", color: Colors.red },
    { title: "Holiday", color: Colors.green },
    { title: "Family", color: Colors.blue },
  ]);

  const addItemToList = (item) => {
    lists.push(item);
    setLists([...lists]);
  };

  const removeItemFromList = (index) => {
    lists.splice(index, 1);
    setLists([...lists]);
  };

  const updateItemFromList = (index, item) => {
    lists[index] = item;
    setLists([...lists]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToList),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color }, index }) => {
          return (
            <ListItem
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("TodoList", { title, color });
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (item) => updateItemFromList(index, item),
                });
              }}
              onDelete={() => removeItemFromList(index)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
});
