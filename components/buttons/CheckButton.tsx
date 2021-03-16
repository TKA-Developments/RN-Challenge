import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Text, View } from "../Themed";
import { CheckButtonType } from "../../types";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

export const TitleCheckButton = ({
  title,
  description,
  onPress,
  check,
}: CheckButtonType) => {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress()}
      style={styles.TitleContainer}
    >
      <View style={styles.TitleViewStyle}>
        <Text
          style={
            check ? { ...styles.TitleStyle, color: "grey" } : styles.TitleStyle
          }
        >
          {title}
        </Text>
        <CheckBox style={styles.CheckBox} value={check} />
      </View>
      {check && <View style={styles.Separator} />}
      <Text
        style={
          check ? { ...styles.DescStyle, color: "grey" } : styles.DescStyle
        }
      >
        {description}
      </Text>
    </TouchableNativeFeedback>
  );
};

export const StepsCheckButton = ({
  steps,
  checkAll,
}: {
  steps: Array<string>;
  checkAll?: boolean;
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Array<Number>>([]);

  useEffect(() => {
    if (checkAll) {
      for (let i = 0; i < steps.length; i++) {
        setCheckedSteps((prevState) => {
          return [...prevState, i];
        });
      }
    } else {
      setCheckedSteps([]);
    }
  }, [checkAll]);

  const checkThisStep = (key: number) => {
    if (checkedSteps.includes(key)) {
      let arr = [...checkedSteps];
      const idx = arr.indexOf(key);
      arr.splice(idx, 1);
      setCheckedSteps(arr);
    } else {
      setCheckedSteps([...checkedSteps, key]);
    }
  };

  const checkOne = (key: number) => {
    if (checkedSteps.includes(key)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.StepsContainer}>
      {steps.length > 0 ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.StepsTitle}>Steps </Text>
        </View>
      ) : (
        <Text style={{ color: "darkgrey", fontSize: 17 }}>
          There is not step for this activity
        </Text>
      )}
      {steps?.map(
        (step, idx) =>
          step.length > 0 && (
            <TouchableNativeFeedback
              key={idx}
              onPress={() => checkThisStep(idx)}
            >
              <StepText step={step} num={idx + 1} check={checkOne(idx)} />
            </TouchableNativeFeedback>
          )
      )}
    </View>
  );
};

const StepText = ({
  step,
  num,
  check,
}: {
  check: boolean;
  num?: Number;
  step?: String;
}) => {
  return (
    <View style={styles.StepsTextContainer}>
      <Text
        style={
          check ? { ...styles.StepsText, color: "grey" } : styles.StepsText
        }
      >
        {num}. {step}
      </Text>
      <CheckBox style={styles.CheckBox} value={check} />
    </View>
  );
};

const titleCardColor = "#0096FF";
const stepCardColor = "#FF8C00";

const styles = StyleSheet.create({
  StepsTextContainer: {
    marginVertical: 3,
    alignSelf: "flex-end",
    width: "90%",
    backgroundColor: stepCardColor,
    flexDirection: "row",
    padding: 5,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  TitleContainer: {
    backgroundColor: titleCardColor,
    padding: 10,
    borderRadius: 15,
  },
  StepsText: { fontSize: 17.5 },
  StepsContainer: { marginTop: 25 },
  StepsTitle: { fontSize: 22, marginBottom: 10 },
  DescStyle: { width: "90%", fontSize: 15 },
  CheckBox: { alignSelf: "center" },
  TitleViewStyle: {
    backgroundColor: titleCardColor,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TitleStyle: { fontSize: 27, fontWeight: "bold" },
  Separator: {
    borderBottomColor: "grey",
    width: "90%",
    borderBottomWidth: 3,
    left: 12,
    position: "absolute",
    top: 30,
  },
});
