import { Button, Overlay } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import { blueColor } from "../constants/Colors";
import { modalInfo } from "../constants/Modal";

type Props = {
  visible: boolean;
  cancelFunction: any;
  mode: string;
  doFunction: any;
};

const ToDoModal = (props: Props) => {
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.cancelFunction}
      backdropStyle={{ backgroundColor: "#3c3a3a9f" }}
      overlayStyle={{
        backgroundColor: "white",
        width: "80%",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <Text style={{ textAlign: "center", fontFamily: "Poppins" }}>
        {(modalInfo as any)[props.mode].detail}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Button
          title={"Yes"}
          buttonStyle={{
            backgroundColor: blueColor.normal,
            borderRadius: 10,
            minWidth: 90,
            marginRight: 20,
          }}
          onPress={async () => {
            await props.doFunction();
            props.cancelFunction();
          }}
        />
        <Button
          title={"No"}
          buttonStyle={{
            backgroundColor: "#D61C4E",
            borderRadius: 10,
            minWidth: 90,
          }}
          onPress={props.cancelFunction}
        />
      </View>
    </Overlay>
  );
};

export default ToDoModal;
