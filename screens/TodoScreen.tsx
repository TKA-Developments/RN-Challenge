import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  TitleCheckButton,
  StepsCheckButton,
} from "../components/buttons/CheckButton";
import { ActivityRouteProps } from "../types";
import { Text, View } from "../components/Themed";

export default function TodoScreen() {
  const route = useRoute<RouteProp<ActivityRouteProps, "data">>();
  const todo = route.params;
  console.log(todo.complete);
  useEffect(() => {
    if (todo.complete) {
      setCheck(todo?.complete);
      
    }
  }, [todo, route]);

  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <TitleCheckButton
        title={todo.title}
        description={todo.description}
        onPress={async () => {
          setCheck(!check);
          await AsyncStorage.mergeItem(
            "activityData",
            JSON.stringify({ complete: !check })
          );
        }}
        check={check}
      />
      <StepsCheckButton steps={todo.steps} checkAll={check} />
    </View>
  );
}

const styles = StyleSheet.create({
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
