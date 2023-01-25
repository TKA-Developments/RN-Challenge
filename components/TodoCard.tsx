import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import { Button } from "@rneui/themed";
import { Card, Button, CheckBox, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { limitDetailLength } from "../lib/function";

type Props = {
  detail: string;
  done: boolean;
  deletefunction: any;
  doFunction: any;
  time: string;
};

const TodoCard = (props: Props) => {
  return (
    <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
      <CheckBox
        checked={props.done}
        checkedIcon={
          <Icon name="radio-button-checked" color="green" size={30} />
        }
        uncheckedIcon={
          <MaterialIcons name="radio-button-unchecked" color="grey" size={30} />
        }
        containerStyle={{ ...styles.checkboxContainer, ...styles.clear }}
        wrapperStyle={{ ...styles.checkboxWrapper, ...styles.clear }}
        // size={30}
        center
      />
      <View style={{ flex: 1, flexGrow: 1, width: "100%" }}>
        <Text style={styles.text}>{limitDetailLength(props.detail, 70)}</Text>
        <Text style={styles.caption}>{props.time}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          containerStyle={{ ...styles.buttonContainer, ...styles.clear }}
          buttonStyle={{ ...styles.button, ...styles.clear }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={20}
            style={{ position: "absolute" }}
            color="white"
          />
        </Button>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    minHeight: 65,
    // borderColor: "#FBFDFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginHorizontal: 5,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  clear: {
    margin: 0,
    padding: 0,
  },
  buttonContainer: {
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 20,
    height: "100%",
    position: "relative",
    backgroundColor: "#D61C4E",
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    // backgroundColor: "#000",

    justifyContent: "center",
    alignItems: "center",
  },
  checkboxWrapper: { width: 30, height: 30 },
  text: { fontFamily: "Poppins", flex: 1, flexWrap: "wrap", marginEnd: 10 },
  buttonView: { width: 30, height: 30, marginLeft: "auto" },
  caption: { fontFamily: "Poppins-Medium", fontSize: 10 },
});

export default TodoCard;
