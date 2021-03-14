import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabOneHeader from "../components/TabOneHeader";
import { Text, View } from "../components/Themed";
import ActivityCard from "../components/cards/ActivityCard";
import { getDay } from "../components/Date";
import RoundButton from "../components/buttons/roundButton";

export default function TabOneScreen() {
  const navigation = useNavigation();

  const onTouch = () => {
    navigation.navigate("ActivityScreen");
  };

  const date = getDay();
  console.log(date?.text);

  const activity = [
    {
      id: 1,
      title: "Do Laundry",
      description: "before the rain comes, do laundry nearby the bike rent",
      steps: ["Bring the bag", "Bring the clothing", "go to the laundry"],
    },
    {
      id: 2,
      title: "Go To Gym",
      description: "with her",
      steps: [
        "Bring mineral water",
        "Bring her water too",
        "dont forget to use perfume",
      ],
    },
    {
      id: 3,
      title: "Go shopping to mall",
      description: "with her too :p, don't waste too much money",
      steps: [],
    },
  ];

  // const color = ["yellow", "orange", "blue", "green"];
  // const cardColorPicker = () => {
  //   const num = Math.floor(Math.random() * 3) + 0; //random color picker 0-3
  //   return num;
  // };

  return (
    <View
      style={activity.length > 0 ? styles.filledContainer : styles.container}
      onTouchEnd={activity.length > 0 ? undefined : onTouch}
    >
      <View style={{ width: "100%" }}>
        {activity.length > 0 ? (
          activity.map((act) => <ActivityCard key={act.id} activity={act} />)
        ) : (
          <View style={styles.LazyStyle}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://media.giphy.com/media/63wm8ylcxGLT7WhkCw/giphy.gif",
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              THERE IS NO ACTIVITY FOR TODAY
            </Text>
            <Text style={{ fontSize: 17 }}> Tap anywhere to add activity</Text>
          </View>
        )}
      </View>
      <View style={styles.AddButtonStyle}>
        <RoundButton color="blue" badge="+" onClick={onTouch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddButtonStyle: { position: "absolute", right: 20, bottom: 0 },
  LazyStyle: { alignItems: "center" },
  image: {
    width: 130,
    height: 100,
  },
  filledContainer: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },
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
