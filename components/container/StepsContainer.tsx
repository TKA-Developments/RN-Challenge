import React, { useState } from "react";
import { StyleSheet, TextInput, Button } from "react-native";
import Steps from "../inputs/Steps";
import { Text, View } from "../Themed";

const StepsContainer = () => {
  const [stepCount, setStepCount] = useState(0);
  const [stepValue, setStepValue] = useState([""]);

  const addStep = () => {
    setStepCount(stepCount + 1);
  };

  const onChange = (num: number, text: string) => {
    let arr = [...stepValue];
    arr[num] = text;
    setStepValue(arr);
  };


  return (
    <View style={styles.ViewButtonStyle}>
      {stepCount > 0 && <Text style={styles.stepsTitle}>Steps</Text>}
      <View style={{marginLeft:20}}>
        {[...Array(stepCount)].map((x, i) => {
          return (
            <Steps
              key={i}
              number={i}
              stepOnChange={onChange}
              value={stepValue[i]}
            />
          );
        })}
      </View>
      <Button title="Add Steps" onPress={addStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepsTitle: { fontSize: 20 },
  ViewButtonStyle: { width: "100%" },
});

export default StepsContainer;
