import * as React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import firebase from "firebase";
export default function ScheduleDetails() {
  const [list, setList]: any = React.useState([]);

  let array = list && Object.keys(list);
  React.useEffect(() => {
    let ambildata = firebase.database().ref("/activity");
    if (ambildata) {
      ambildata.once("value").then((snapshot) => {
        setList(snapshot.val());
      });
    }
    // list[item].activity
  }, [list]);

  const getDateLive = () => {
    const date = new Date().toUTCString().split(" ");
    let dateNow = "";
    for (let i = 0; i < 4; i++) {
      dateNow += date[i] + " ";
    }
    return dateNow;
  };

  const manyDone = (array: any) => {
    let i = 0;
    if (array.length > 0) {
      array.map((item: string) => {
        if (list[item].isDone) {
          i++;
        }
      });
    }
    return i;
  };

  const wiseWord = (number: any) => {
    const words = [
      "You can do it!!! ʕ•́ᴥ•̀ʔっ",
      "Great start!!!,keep fighting (ง︡'-'︠)ง",
      "Great Jobs!!! (ɔ◔‿◔)ɔ ♥",
      "Great , it's okay to have self rewards",
      "Nothing can Stop you, push your limit ⚔️",
      "What a productive day!!!",
    ];
    let wise = "";
    switch (true) {
      case number > 0 && number < 4:
        wise += words[1];
        break;
      case number > 3 && number < 7:
        wise += words[2];
        break;
      case number > 6 && number < 10:
        wise += words[3];
        break;
      case number > 9 && number < 13:
        wise += words[4];
        break;
      case number > 12 && number < 16:
        wise += words[5];
        break;
      default:
        wise += words[0];
        break;
    }
    return wise;
  };

  const deleteAll = () => {
    firebase
      .database()
      .ref("/activity")
      .remove()
      .then(() => {
        alert("Dimulai dari 0 ya");
        setList([]);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={styles.textDate}>{getDateLive()}</Text>
          <Text style={styles.textSpirit}>
            {array ? wiseWord(manyDone(array)) : wiseWord(0)}
          </Text>
        </View>
        <View style={styles.sectionDetail}>
          <View style={styles.containerDetail}>
            <View style={styles.textWrapper}>
              <Text style={styles.textAngka}>
                {array ? array.length - manyDone(array) : 0}
              </Text>
            </View>
            <Text style={styles.textDetails}>On Going Activity</Text>
          </View>
          <View style={styles.containerDetail}>
            <View style={styles.textWrapper}>
              <Text style={styles.textAngka}>
                {array ? manyDone(array) : 0}
              </Text>
            </View>
            <Text style={styles.textDetails}>You Have Done</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.resetBtnContainer}
          onPress={() => deleteAll()}
        >
          <Text style={styles.resetBtn}>Reset Activity, and Start New Day</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionDetail: {
    flex: 1,
    paddingTop: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerDetail: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textAngka: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  titleWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  textDate: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textDetails: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  textWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: "center",
  },
  textSpirit: {
    fontWeight: "bold",
    textAlign: "center",
    width: "95%",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
  },
  resetBtn: {
    paddingTop: 8,
    textAlign: "center",
    borderWidth: 1,
    color: "#fff",
    fontWeight: "bold",
    height: 40,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "red",
  },
  resetBtnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 200,
    backgroundColor: "#fff",
  },
});
