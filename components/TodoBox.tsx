import moment from "moment";
import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { Text, View } from "./Themed";
import AnimationSlide from "./AnimationSlide";

export default function TodoBox(props: {
  todo?: string;
  complete?: boolean;
  toggleTodo?: any;
  id?: string;
  toggleEdit?: any;
}) {
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 75);
    const randomColor = `hsl(${hue}, 70%, 50%)`;
    return randomColor;
  };

  const [myColor, setMyColor] = React.useState(getRandomColor());
  const windowWidth = Dimensions.get("window").width;

  return (
    <>
      <AnimationSlide
        id={props.id}
        toggleEdit={props.toggleEdit}
        task={props.todo}
      >
        <View style={styles(myColor).container}>
          <CheckBox
            disabled={props.complete ? true : false}
            value={props.complete}
            onValueChange={() => props.toggleTodo(props.id)}
            tintColors={{ true: "#005182", false: "#BDC7D6" }}
          />
          <Text style={styles(myColor).todo}>{props.todo}</Text>
        </View>
      </AnimationSlide>
    </>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 16,
      width: "100%",
      backgroundColor: "white",
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      borderLeftColor: color,
      borderLeftWidth: 8,
      paddingRight: 16,
    },
    todo: {
      textTransform: "capitalize",
      marginBottom: 4,
      fontSize: 16,
      marginLeft: 16,
      paddingRight: 16,
    },
  });
