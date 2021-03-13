import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import RoundButton from "../components/buttons/roundButton";
import StepsContainer from "../components/container/StepsContainer";
import Input from "../components/inputs/Input";
import { View } from "../components/Themed";

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
    <View style={styles.viewStyle}>
      <View>
        <Input label="Title" value={value.title} onChange={inputOnChange} />
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
      <RoundButton color="blue" onClick={save} icon="save" text="Save" />
    </View>
  );
};

let screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  StepTitleStyle: { fontWeight: "bold", fontSize: 17 },
  ViewButtonStyle: { width: "100%", marginTop: 20 },
  viewStyle: { padding: 10, flex: 1 },
});

export default ActivityFormScreen;
