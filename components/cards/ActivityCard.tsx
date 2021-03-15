import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
// import { ActivityList } from "../../types";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const ActivityCard = ({ data }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("TodoScreen", data.activity)}
    >
      <View style={data.complete === true? {...styles.cardStyle, backgroundColor:"grey"}:{...styles.cardStyle, backgroundColor:"skyblue"}}>
        <Text style={styles.textStyle}>{data.activity.title}</Text>
        <CheckBox />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  textStyle: { fontSize: 21, fontWeight: "bold" },
  cardStyle: {
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    height: 50,
    marginVertical: 10,
  },
});

export default ActivityCard;
