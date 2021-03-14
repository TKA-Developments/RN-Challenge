import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { ActivityList } from "../../types";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const ActivityCard = ({ activity }: ActivityList) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("TodoScreen", { activity })}
    >
      <View style={styles.cardStyle}>
        <Text style={styles.textStyle}>{activity.title}</Text>
        <CheckBox />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  textStyle: { fontSize: 21 },
  cardStyle: {
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    height: 50,
    backgroundColor: "skyblue",
    marginVertical: 10,
  },
});

export default ActivityCard;
