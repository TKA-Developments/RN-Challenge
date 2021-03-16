import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  useRoute,
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  TitleCheckButton,
  StepsCheckButton,
} from "../components/buttons/CheckButton";
import { Ionicons } from "@expo/vector-icons";
import { ActivityRouteProps } from "../types";
import { Text, View } from "../components/Themed";

export default function TodoScreen() {
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<ActivityRouteProps, "data">>();
  const todo = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    if (todo.activity.complete) {
      setCheck(todo.activity.complete);
    }
  }, [todo, isFocused]);

  const [check, setCheck] = useState(false);

  const deleteItem = (item: string) => {
    AsyncStorage.getItem("activityData").then((res: any) => {
      const data = JSON.parse(res);
      data.forEach((dt: any) => {
        if (dt.activity.title === todo.activity.title) {
          let idx: number;
          idx = data.indexOf(dt);
          data.splice(idx, 1);
        }
      });
      AsyncStorage.setItem("activityData", JSON.stringify(data));
      navigation.navigate("TabOneScreen");
    });
  };

  const editItem = (item: string) => {
    navigation.navigate("ActivityScreen", { todo });
    // console.log(todo)
  };

  return (
    <View style={styles.container}>
      <TitleCheckButton
        title={todo.activity.title}
        description={todo.activity.description}
        onPress={() => {
          setCheck(!check);
          AsyncStorage.getItem("activityData")
            .then((res: any) => {
              const data = JSON.parse(res);
              let currentData: any;
              currentData = [];
              data.forEach((dt: any) => {
                if (dt.activity.title === todo.activity.title) {
                  let idx: number;
                  idx = data.indexOf(dt);
                  data.splice(idx, 1);
                  currentData.push(dt);
                }
              });
              // console.log("cuurrent");
              // console.log(currentData.length);

              const obj = currentData[0];
              // console.log(obj)
              obj.activity.complete = !check;
              const nextdata: Array<any> = [];
              nextdata.push(obj, ...data);
              AsyncStorage.setItem("activityData", JSON.stringify(nextdata));
            })
            .catch((error) => console.log(error));
        }}
        check={check}
      />
      <StepsCheckButton steps={todo.activity.steps} checkAll={check} />
      <TouchableNativeFeedback onPress={() => editItem(todo.activity.title)}>
        <View
          style={{
            ...styles.deleteButton,
            bottom: 100,
            backgroundColor: "blue",
          }}
        >
          <Ionicons
            style={{ alignSelf: "center" }}
            name="ios-pencil"
            size={35}
            color="white"
          />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => deleteItem(todo.activity.title)}>
        <View style={styles.deleteButton}>
          <Ionicons
            style={{ alignSelf: "center" }}
            name="trash"
            size={35}
            color="black"
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    height: 70,
    width: 70,
    backgroundColor: "red",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  container: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
