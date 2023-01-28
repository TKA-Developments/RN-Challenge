import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ListItemProps {
  list: {
    id: string;
    title: string;
    color: string;
  };
}

const ListItem = ({ list }: ListItemProps) => {
  const nav = useNavigation();

  const onPress = () => {
    console.warn(`opening ${list.title}`);
    nav.navigate("List", { id: list.id });
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="checkbox-blank"
          size={40}
          color={list.color}
        />
      </View>
      <Text style={styles.title}>{list.title}</Text>
    </Pressable>
  );
};

export default ListItem;
