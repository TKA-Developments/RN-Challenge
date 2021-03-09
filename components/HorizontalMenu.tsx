import * as React from "react";
import { StyleSheet } from "react-native";
import MyButton from "./MyButton";

import { Text, View } from "./Themed";

export default function VerticalMenu(props: {
  menu?: any;
  onSelectedMenu?: any;
  selectedMenu?: any;
}) {
  return (
    <View style={styles.container}>
      {props.menu.map((item?: any, key?: number) => (
        <MyButton
          key={key}
          text={item}
          active={props.selectedMenu}
          onPress={() => {
            props.onSelectedMenu(item);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  },
});
