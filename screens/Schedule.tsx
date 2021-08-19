import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import * as React from "react";
import { Activity } from "../components/Activity";
import { Title } from "../components/Title";
import { Inputs } from "../components/Inputs";
import firebase from "firebase";
export default function Contoh() {
  const [list, setList]: any = React.useState([]);
  const [updateActivity, setUpdateActivity] = React.useState("");
  let array: any = [];
  React.useEffect(() => {
    let ambildata = firebase.database().ref("/activity");

    if (ambildata) {
      ambildata.once("value").then((snapshot) => {
        setList(snapshot.val());
      });
    }
    // list[item].activity
  }, [list]);
  if (list) {
    array = Object.keys(list);
  }
  function handlerCheck(id: any) {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .set({
        activity: item.activity,
        isDone: true,
      })
      .then(() => {
        alert("Great Job, Tugas Kamu Selesai");
      })
      .catch((err) => {
        alert(err);
      });
  }
  function updateFunc(id: any) {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .set({
        activity: updateActivity,
        isDone: false,
      })
      .then(() => {
        alert("Activity Berhasil Diubah");
      })
      .catch((err) => {
        alert(err);
      });
  }
  function deleteItem(id: any) {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .remove()
      .then(() => {
        alert("Activity Dihapus");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 30, paddingBottom: 50 }}>
        <Title />
      </View>
      {array.length > 0 ? (
        <ScrollView>
          {array.map((item: any) => {
            return (
              <Activity
                key={item}
                checkFunc={() => handlerCheck(item)}
                types={`${list[item].isDone ? "success" : "process"}`}
                updateState={setUpdateActivity}
                updateFunc={() => updateFunc(item)}
                deleteFunc={() => deleteItem(item)}
              >
                {list[item].activity}
              </Activity>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.containerBlank}>
          <Text style={styles.textBlank}>
            Get Productive now! Fill the input below
          </Text>
        </ScrollView>
      )}
      <Inputs />
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
});
