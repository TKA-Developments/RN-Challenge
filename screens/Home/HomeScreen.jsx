import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ListItem from "../../components/ListItem";
import Colors from "../../constants/Colors";

export default () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { title: "Work", color: Colors.red },
          { title: "Holiday", color: Colors.green },
          { title: "Family", color: Colors.blue },
        ]}
        renderItem={({ item: { title, color }, index }) => {
          return <ListItem title={title} color={color} />;
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
});
