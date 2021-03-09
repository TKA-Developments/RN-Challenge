import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, Modal } from "react-native";

import { Text, View } from "./Themed";
import * as Animatable from "react-native-animatable";

import MyButton from "./MyButton";

import MyImage from "../assets/images/myImage.jpg";

export default function MessageModal(props: {
  showMessageToggle?: any;
  title?: string;
  message?: string;
  images?: any;
}) {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <Animatable.View
          animation="rubberBand"
          duration={2000}
          style={styles.content}
        >
          <Text style={styles.title}>
            {props.title ? props.title : "Success"}
          </Text>
          <Text style={styles.description}>
            {props.message
              ? props.message
              : "Wow, keep up and always do the best."}
          </Text>
          <Image
            source={props.images ? props.images : MyImage}
            style={{ width: 150, height: 150, alignSelf: "center" }}
          />
          <MyButton
            active={"oke"}
            text={"oke"}
            style={{ marginTop: 24 }}
            onPress={props.showMessageToggle}
          />
        </Animatable.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: 250,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 26,
    textTransform: "capitalize",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    marginBottom: 16,
  },
});
