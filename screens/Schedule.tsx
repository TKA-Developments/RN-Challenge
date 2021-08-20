import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import * as React from "react";
import { Activity } from "../components/Activity";
import { Title } from "../components/Title";
import { Inputs } from "../components/Inputs";
import firebase from "firebase";
import Utils from "../constants/Utils";
import Filter from "../components/Filter";

export default function Schedule({ navigation }: any) {
  const [list, setList]: any = React.useState([]);

  const [updateActivity, setUpdateActivity] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [filter, setFilter]: any = React.useState({
    isPress: false,
    isDone: false,
  });
  React.useEffect(() => {
    let ambildata = firebase.database().ref("/activity");
    if (ambildata) {
      ambildata.once("value").then((snapshot) => {
        setList(snapshot.val());
      });
    }
  }, [list]);
  let array = list && Object.keys(list);
  function handlerFilter(boolean: any) {
    setFilter({
      isPress: !filter.isPress,
      isDone: !boolean,
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 30, paddingBottom: 50 }}>
        <Title />
        <View style={styles.containerFilter}>
          <Pressable
            style={styles.buttonDone}
            onPress={() => handlerFilter(false)}
          >
            <Text style={styles.textStyle}>Done</Text>
          </Pressable>
          <Pressable
            style={styles.buttonOnGoing}
            onPress={() => handlerFilter(true)}
          >
            <Text style={styles.textStyle}>OnGoing</Text>
          </Pressable>
        </View>
      </View>
      {array ? (
        filter.isPress ? (
          <Filter
            list={list}
            data={array}
            setUpdateActivity={setUpdateActivity}
            updateActivity={updateActivity}
            filter={filter}
          />
        ) : (
          <ScrollView>
            {array.map((item: any) => {
              return (
                <Activity
                  key={item}
                  checkFunc={() => Utils.UpdateCheckItems(item, list)}
                  types={`${list[item].isDone ? "success" : "process"}`}
                  updateState={setUpdateActivity}
                  updateFunc={() =>
                    Utils.UpdateItems(item, list, updateActivity)
                  }
                  deleteFunc={() => Utils.DeleteItems(item, list)}
                >
                  {list[item].activity}
                </Activity>
              );
            })}
          </ScrollView>
        )
      ) : (
        <ScrollView contentContainerStyle={styles.containerBlank}>
          <Text style={styles.textBlank}>
            Get Productive now! Fill the input below
          </Text>
        </ScrollView>
      )}
      <Inputs state={{ activity, setActivity }} setList={setList} list={list} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  containerBlank: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    alignContent: "center",
    backgroundColor: "#948685",
    height: 80,
    marginBottom: 5,
  },
  textBlank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
  inputSection: {
    justifyContent: "flex-end",
  },
  buttonDefault: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    backgroundColor: "#F4F4F4",
  },
  buttonDone: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    backgroundColor: "green",
  },
  buttonOnGoing: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    backgroundColor: "#cf1f2d",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerFilter: {
    marginTop: 50,
    marginBottom: -30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
