import { useLinkProps } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "./Themed";

export default function MyButton(props: {
  text?: string;
  active?: string;
  onPress?: any;
  style?: any;
}) {
  const isActive = props.active
    ? props.text == props.active
      ? true
      : false
    : true;
  return (
    <TouchableOpacity
      style={[styles(isActive).button, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles(isActive).text]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = (isActive?: boolean) =>
  StyleSheet.create({
    button: {
      backgroundColor: isActive ? "#005182" : "transparent",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 10,
    },
    text: {
      color: isActive ? "white" : "#5B6470",
      textTransform: "capitalize",
      fontWeight: "700",
      textAlign: "center",
    },
  });
