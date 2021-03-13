import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../Themed";
import { StepForm } from "../../types";

const Steps = ({ number, value, stepOnChange }: StepForm) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.labelStyle}>{number+1}.</Text>
      <TextInput
        style={styles.input}
        placeholder={`step`}
        value={value}
        onChangeText={(text) => stepOnChange(number, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {marginRight:20, fontSize:18},
  viewStyle: { flexDirection: "row" },
  input: { fontSize: 17, width:"90%" },
});

export default Steps;
