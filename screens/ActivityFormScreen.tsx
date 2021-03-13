import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import StepsContainer from "../components/container/StepsContainer";
import Input from "../components/inputs/Input";
import Steps from "../components/inputs/Steps";
import { Text, View } from "../components/Themed";

const ActivityFormScreen = () => {
  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  const inputOnChange = (lbl: string, text: string) => {
    const label = lbl.toLowerCase();
    setValue((prevState) => {
      return {
        ...prevState,
        [label]: text,
      };
    });
  };

  return (
    <KeyboardAvoidingView behavior={"position"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.viewStyle}>
          <Input label="Title" value={value.title} onChange={inputOnChange} />
          <Input
            label="Description"
            value={value.description}
            onChange={inputOnChange}
          />
          <View style={styles.ViewButtonStyle}>
            <StepsContainer />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  StepTitleStyle: { fontWeight: "bold", fontSize: 17 },
  ViewButtonStyle: { width: "100%", marginTop: 20 },
  viewStyle: { padding: 10 },
});

export default ActivityFormScreen;
