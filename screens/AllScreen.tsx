import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";

export default function AllScreen() {
  const a = [1, 2, 3];
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(e, i) => i.toString()}
        data={a}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
});
