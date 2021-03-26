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

  return <View style={styles.container}>
    <Text style={styles.header}>{greeting},</Text>
    <Text style={styles.header}>{name}!</Text>
    </View>
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#d8ebe4",
  }
});

export default Greeting;