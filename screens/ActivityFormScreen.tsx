import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, BackHandler } from "react-native";
import StepsContainer from "../components/container/StepsContainer";
import Input from "../components/inputs/Input";
import AsyncStorage from "@react-native-community/async-storage";
import {
  useNavigation,
  useIsFocused,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { View } from "../components/Themed";
import { ShowCurrentDate } from "../components/Date";
import { ActivityRouteProps } from "../types";

const ActivityFormScreen = () => {
  const route = useRoute<RouteProp<any, "">>();
  const todo = route.params;

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [value, setValue] = useState({
    activity: "",
    description: "",
  });

  const [editValue, setEditValue] = useState({
    activity: "",
    description: "",
  });

  const [stepEditValue, setStepEditValue] = useState([""]);

  const [stepValue, setStepValue] = useState([""]);
  // const [id, setId] = useState();

  useEffect(() => {
    const { date, hour, minute, month, year } = ShowCurrentDate;
    // console.log("todo");
    // console.log(todo);
    if (todo) {
      setEditValue({
        activity: todo.todo.activity.title,
        description: todo.todo.activity.description,
      });
      if (todo.todo.activity.steps.length > 0) {
        todo.todo.activity.steps.forEach((step: any) => {
          setStepEditValue((prevState) => {
            return [...prevState, step];
          });
        });
      }
    } else {
      return;
    }

    const saveData = {
      date: year + "/" + month + "/" + date + ":" + hour + "." + minute,
      activity: {
        title: value.activity,
        description: value.description,
        steps: stepValue,
        complete: false,
      },
    };

    let backAction: any;
    backAction = () => {
      try {
        AsyncStorage.getItem("activityData")
          .then((res: any) => {
            const obj = JSON.parse(res);
            // console.log(obj);
            if (obj !== null) {
              const data = [];
              data.push(...obj, saveData);
              AsyncStorage.setItem("activityData", JSON.stringify(data)).then(
                () => {
                  console.log("data has been added");
                }
              );
            } else {
              AsyncStorage.setItem(
                "activityData",
                JSON.stringify([saveData])
              ).then(() => {
                console.log("data has been created");
              });
            }
            navigation.navigate("TabOneScreen");
          })
          .catch((error) => console.log(error));
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
  }, [value, stepValue, todo, isFocused]);

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
            editValue={editValue.activity}
          />
          <Input
            label="Description"
            value={value.description}
            onChange={inputOnChange}
            editValue={editValue.description}
          />
        </View>

        <View style={styles.ViewButtonStyle}>
          <StepsContainer
            stepEditValue={stepEditValue}
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
  ViewButtonStyle: {
    marginTop: 50,
    height: "100%",
  },
  viewStyle: { padding: 10 },
});

export default ActivityFormScreen;
