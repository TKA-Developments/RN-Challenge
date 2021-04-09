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

const renderAddListIcon = (navigation, addItemToList) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Edit", { saveChanges: addItemToList })
      }
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
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
                navigation.navigate("Edit", { title, color });
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
