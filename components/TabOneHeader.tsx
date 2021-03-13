import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";

const TabOneHeader = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: "https://media.giphy.com/media/63wm8ylcxGLT7WhkCw/giphy.gif",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
      width:130,
      height:100
  },
});

export default TabOneHeader;
