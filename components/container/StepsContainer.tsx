import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import RoundButton from "../buttons/roundButton";

import Steps from "../inputs/Steps";
import { Text, View } from "../Themed";
import { StepContainerType } from "../../types";

const StepsContainer = ({ onChange, stepValue, save }: StepContainerType) => {
  const [stepCount, setStepCount] = useState(0);

  const addStep = () => {
    setStepCount(stepCount + 1);
  };

  return (
    <View style={styles.ViewStyle}>
      {stepCount > 0 && <Text style={styles.stepsTitle}>Steps</Text>}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginLeft: 20 }}>
          <View>
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
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <RoundButton
            onClick={addStep}
            text="Add Step"
            badge="+"
            color="grey"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TouchableButton: { backgroundColor: "blue", width: 70, height: 70 },
  stepsTitle: { fontSize: 20 },
  ViewStyle: { width: "100%", height: "100%" },
});

export default StepsContainer;
