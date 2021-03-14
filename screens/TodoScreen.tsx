import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  TitleCheckButton,
  StepsCheckButton,
} from "../components/buttons/CheckButton";
import { Text, View } from "../components/Themed";


export default function TodoScreen() {
  const route = useRoute();
  const todo = route.params?.activity

  // console.log(todo);

  const [check, setCheck] = useState(false);

  return (
    <View style={styles.container}>
      <TitleCheckButton
        title={todo.title}
        description={todo.description}
        onPress={() => setCheck(!check)}
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
