import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, BackHandler } from "react-native";
import StepsContainer from "../components/container/StepsContainer";
import Input from "../components/inputs/Input";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View } from "../components/Themed";
import { ShowCurrentDate } from "../components/Date";

const ActivityFormScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState({
    activity: "",
    description: "",
  });
  const [stepValue, setStepValue] = useState([""]);

  const { date, hour, minute, month, year } = ShowCurrentDate;

  useEffect(() => {
    const saveData = {
      id: `${date + "" + month + "" + year + "" + hour + "" + minute}`,
      activity: {
        title: value.activity,
        description: value.description,
        steps: stepValue,
      },
    };

    let backAction: any;
    backAction = async () => {
      try {
        // console.log(saveData);
        await AsyncStorage.setItem("activityData", JSON.stringify(saveData));
        navigation.goBack();
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    if (value.activity.length > 0) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [value, stepValue]);

  const inputOnChange = (lbl: string, text: string) => {
    const label = lbl.toLowerCase();
    setValue((prevState) => {
      return {
        ...prevState,
        [label]: text,
      };
    });
  };

  const stepOnChange = (num: number, text: string) => {
    let arr = [...stepValue];
    arr[num] = text;
    setStepValue(arr);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.KAVstyle}>
      {/* <BacktosaveModal visible={modal} /> */}
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
          <StepsContainer stepValue={stepValue} onChange={stepOnChange} />
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
  ViewButtonStyle: {
    marginTop: 50,
    height: "100%",
  },
  viewStyle: { padding: 10 },
});

export default ActivityFormScreen;
