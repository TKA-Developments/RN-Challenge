import * as React from "react";
import { StyleSheet } from "react-native";

import Header from "../components/Header";
import { Text, View } from "../components/Themed";
import TodoCard from "../components/TodoCard";
import Toolbar from "../components/Toolbar";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Toolbar />
      <TodoCard
        detail="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod repellendus a at modi repellat alias optio quisquam nesciunt, voluptatum repudiandae excepturi neque natus ipsum quasi veniam. Voluptate, iure cupiditate?"
        deletefunction={() => {}}
        doFunction={() => {}}
        done={true}
        time={"09.00"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
