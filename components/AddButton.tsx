import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function AddButton(props: { onPress?: any }) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Ionicons name="add-circle-sharp" size={50} color="#005182" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
});
