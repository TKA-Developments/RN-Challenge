import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RoundButton from "../buttons/roundButton";

import Steps from "../inputs/Steps";
import { Text, View, ScrollView } from "../Themed";
import { StepContainerType } from "../../types";

const StepsContainer = ({
  onChange,
  stepValue,
  save,
  stepEditValue,
}: StepContainerType) => {
  const [stepCount, setStepCount] = useState(1);

  const addStep = () => {
    setStepCount(stepCount + 1);
  };

  useEffect(() => {
    if (stepEditValue.length > 0) {
      setStepCount(stepEditValue.length + 1);
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      {stepCount > 0 && <Text style={styles.stepsTitle}>Steps</Text>}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginLeft: 20 }}>
          {[...Array(stepCount)].map((x, i) => {
            return (
              <Steps
                key={i}
                number={i}
                stepOnChange={onChange}
                value={stepValue[i]}
                editValue={stepEditValue[i]}
              />
            );
          })}
        </View>

        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            alignSelf: "flex-end",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <RoundButton onClick={addStep} badge="+" color="grey" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  TouchableButton: { width: 70, height: 70 },
  stepsTitle: { fontSize: 20 },
  ViewStyle: {},
});

export default StepsContainer;
