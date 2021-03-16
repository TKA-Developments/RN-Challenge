import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, View, ScrollView } from "../components/Themed";
import ActivityCard from "../components/cards/ActivityCard";
import RoundButton from "../components/buttons/roundButton";
import { ActivityHomeList } from "../types";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const isFocused = useIsFocused();
  const [activity, setActivity] = useState<any>([]);

  const getActivityData = () => {
    // AsyncStorage.removeItem("activityData").then((res:any)=>{
    //   setActivity([]);
    // })
    AsyncStorage.getItem("activityData").then((res: any) => {
      if (res) {
        // console.log(res);
        let data: any;
        data = JSON.parse(res);
        setActivity(data);
      } else {
        console.log("no data");
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      getActivityData();
    }
  }, [isFocused]);

  // console.log("activity: ");
  // console.log(activity);
  const navigation = useNavigation();

  const onTouch = () => {
    navigation.navigate("ActivityScreen");
  };

  return (
    <View style={styles.filledContainer}>
      {activity?.length > 0 ? (
        <ActivityList data={activity} />
      ) : (
        <TouchableNativeFeedback onPress={onTouch} style={styles.LazyStyle}>
          <View>
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
            <Text style={{ fontSize: 17, alignSelf: "center" }}>
              Tap anywhere to add activity
            </Text>
          </View>
        </TouchableNativeFeedback>
      )}
      <View style={styles.AddButtonStyle}>
        <RoundButton color="blue" badge="+" onClick={onTouch} />
      </View>
    </View>
  );
}

const ActivityList = ({ data }: { data: any }) => {
  return (
    <ScrollView>
      {data.map((act: any, idx: number) => (
        <ActivityCard key={idx} data={act} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  AddButtonStyle: {
    position: "absolute",
    right: 20,
    bottom: 10,
    borderRadius: 50,
    alignContent: "center",
  },
  LazyStyle: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 130,
    height: 100,
    alignSelf: "center",
  },
  filledContainer: {
    flex: 1,
    padding: 10,
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
