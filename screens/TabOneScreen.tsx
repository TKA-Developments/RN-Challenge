import { AntDesign } from "@expo/vector-icons";
import * as React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import BottomDrawer from "../components/BottomDrawer";

import Header from "../components/Header";
import { Text, View } from "../components/Themed";
import TodoCard from "../components/TodoCard";
import Toolbar from "../components/Toolbar";
import { blueColor } from "../constants/Colors";
const a = ["mandi", "makan", "nubes", "tidur", "olahraga"];
export default function TabOneScreen() {
  const bottomDrawerRef = React.useRef();
  const [openDrawer, setopenDrawer] = React.useState(false);
  return (
    <View style={styles.container}>
      <Header />
      <Toolbar />
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {a.map((val, idx) => (
          <TodoCard
            detail={val}
            deletefunction={() => {}}
            doFunction={() => {}}
            done={true}
            time={"19.00"}
            key={val + idx}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.createButton}
        activeOpacity={0.9}
        onPress={() => {
          // (bottomDrawerRef.current as any).swipe("up");
          setopenDrawer(true);
        }}
      >
        <AntDesign name="plus" size={50} color={"white"} />
      </TouchableOpacity>
      <BottomDrawer open={openDrawer} ref={bottomDrawerRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "relative",
  },
  createButton: {
    position: "absolute",
    bottom: 10,
    right: 25,
    borderRadius: 35,
    padding: 10,
    backgroundColor: blueColor.normal,
    elevation: 20,
  },
});
