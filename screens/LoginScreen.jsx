import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";

import LabeledInput from "../components/LabeledInput";

export default () => {
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TodoApp</Text>
      <View style={{ flex: 1 }}>
        <LabeledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email"
        />
        <LabeledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
        />
        {isCreateMode && (
          <LabeledInput
            label="Re-enter password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setIsCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={() => {}}
        buttonStyle={{ backgroundColor: Colors.red }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  header: {
    fontSize: 72,
    color: Colors.red,
    alignSelf: "center",
  },
});
