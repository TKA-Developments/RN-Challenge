import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TabOneHeader from "../components/TabOneHeader";
import { Text, View } from "../components/Themed";
import { ActivityList } from "../types";

export default function TabOneScreen() {
  
  const navigation = useNavigation();
  
  const onTouch = () => {
    navigation.navigate("ActivityScreen")
  };

  return (
    <View style={styles.container} onTouchEnd={onTouch}>
      <View style={{ alignItems: "center" }}>
          <TabOneHeader />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            THERE IS NO ACTIVITY FOR TODAY
          </Text>
          <Text style={{ fontSize: 17 }}> Tap anywhere to add activity</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
