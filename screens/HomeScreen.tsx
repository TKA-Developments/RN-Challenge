import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView } from "../components/Themed";
import ActivityCard from "../components/cards/ActivityCard";
import RoundButton from "../components/buttons/roundButton";

export default function TabOneScreen() {
  const navigation = useNavigation();

  const onTouch = () => {
    navigation.navigate("ActivityScreen");
  };

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
    {
      id: 4,
      title: "Do Laundry",
      description: "before the rain comes, do laundry nearby the bike rent",
      steps: ["Bring the bag", "Bring the clothing", "go to the laundry"],
    },
    {
      id: 5,
      title: "Go To Gym",
      description: "with her",
      steps: [
        "Bring mineral water",
        "Bring her water too",
        "dont forget to use perfume",
      ],
    },
    {
      id: 6,
      title: "Go shopping to mall",
      description: "with her too :p, don't waste too much money",
      steps: [],
    },
    {
      id: 7,
      title: "Do Laundry",
      description: "before the rain comes, do laundry nearby the bike rent",
      steps: ["Bring the bag", "Bring the clothing", "go to the laundry"],
    },
    {
      id: 8,
      title: "Go To Gym",
      description: "with her",
      steps: [
        "Bring mineral water",
        "Bring her water too",
        "dont forget to use perfume",
      ],
    },
    {
      id: 9,
      title: "Go shopping to mall",
      description: "with her too :p, don't waste too much money",
      steps: [],
    },
    {
      id: 10,
      title: "Go To Gym",
      description: "with her",
      steps: [
        "Bring mineral water",
        "Bring her water too",
        "dont forget to use perfume",
      ],
    },
  ];

  return (
    <View style={styles.filledContainer}>
      <ScrollView>
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
      </ScrollView>
      <View style={styles.AddButtonStyle}>
        <RoundButton color="blue" badge="+" onClick={onTouch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddButtonStyle: {
    position: "absolute",
    right: 20,
    bottom: 0,
    borderRadius: 50,
    alignContent: "center",
  },
  LazyStyle: { alignItems: "center" },
  image: {
    width: 130,
    height: 100,
  },
  filledContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
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
