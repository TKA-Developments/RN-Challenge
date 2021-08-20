import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
export function Title(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}>Watchuwan Todo</Text>
      <Text style={styles.titleDesc}>Organize your Work And Life</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleDesc: {
    fontSize: 14,
    textAlign: "center",
  },
});
