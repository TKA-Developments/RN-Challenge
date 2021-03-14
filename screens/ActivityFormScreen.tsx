import React, { useState } from "react";
import { StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import RoundButton from "../components/buttons/roundButton";
import StepsContainer from "../components/container/StepsContainer";
import Input from "../components/inputs/Input";
import { View } from "../components/Themed";

const ActivityFormScreen = () => {
  const [value, setValue] = useState({
    activity: "",
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

  const [stepValue, setStepValue] = useState([""]);

  const stepOnChange = (num: number, text: string) => {
    let arr = [...stepValue];
    arr[num] = text;
    setStepValue(arr);
  };

  const save = () => {
    console.log(value);
    console.log(stepValue);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.KAVstyle}>
      <View style={styles.viewStyle}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "darkgrey" }}>
          <Input
            label="Activity"
            value={value.activity}
            onChange={inputOnChange}
          />
          <Input
            label="Description"
            value={value.description}
            onChange={inputOnChange}
          />
        </View>

        <View style={styles.ViewButtonStyle}>
          <StepsContainer
            save={save}
            stepValue={stepValue}
            onChange={stepOnChange}
            
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  KAVstyle: { flex: 1 },
  container: {
    backgroundColor: "white",
  },
  StepTitleStyle: { fontWeight: "bold", fontSize: 17 },
  ViewButtonStyle: { width: "100%", marginTop: 50, height: "100%" },
  viewStyle: { padding: 10, flex: 1 },
});

export default ActivityFormScreen;
