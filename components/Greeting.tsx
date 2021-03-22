import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Greeting = () => {
    const hour = new Date().getHours();
    let greeting;
    const name = "Joko"

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return <Text>{greeting} {name}</Text>;
};

const styles = StyleSheet.create({});

export default Greeting;