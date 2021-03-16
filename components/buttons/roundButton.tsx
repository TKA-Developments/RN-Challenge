import React from "react";
import { TouchableNativeFeedback, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { ButtonType } from "../../types";
import { AntDesign } from "@expo/vector-icons";

function ButtonIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={styles.IconStyle} {...props} />;
}

const RoundButton = ({ onClick, text, badge, icon, color }: ButtonType) => {
  return (
    <View style={styles.MarginButtonStyle}>
      <TouchableNativeFeedback onPress={() => onClick()}>
        <View
          style={{ ...styles.TouchableButton, backgroundColor: `${color}` }}
        >
          {badge ? (
            <Text style={styles.TextButton}>{badge}</Text>
          ) : (
            <ButtonIcon name={icon} color="white" />
          )}
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.BottomTextButton}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  MarginButtonStyle: {
    borderRadius: 50,
    backgroundColor: "#ffffff00",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  IconStyle: { textAlign: "center" },
  BottomTextButton: { textAlign: "center", color: "yellow" },
  TextButton: { fontSize: 50, textAlign: "center", bottom: 3, color: "white" },
  TouchableButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
  },
});

export default RoundButton;