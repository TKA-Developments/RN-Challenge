import firebase from "firebase";

import { showMessage } from "react-native-flash-message";
const Utils = {
  UpdateItems: (id: any, list: any, updateActivity: any) => {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .set({
        activity: updateActivity,
        isDone: false,
      })
      .then(() => {
        showMessage({
          message: "🔔 Success",
          description: "Your Task Has Been Updated",
          type: "success",
          animationDuration: 300,
          duration: 2000,
        });
      })
      .catch((err) => {
        alert(err);
      });
  },
  UpdateCheckItems: (id: any, list: any) => {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .set({
        activity: item.activity,
        isDone: true,
      })
      .then(() => {
        showMessage({
          message: "🔔 Great Job!",
          description: "Nice Work, Keep It Up!!!",
          type: "success",
          animationDuration: 300,
          duration: 2000,
        });
      })
      .catch((err) => {
        alert(err);
      });
  },
  DeleteItems: (id: any, list: any) => {
    let item: any = list[id];
    firebase
      .database()
      .ref(`/activity/` + id)
      .remove()
      .then(() => {
        showMessage({
          message: "🔔 Deleted",
          description: "Your Task Has Been Deleted",
          type: "danger",
          animationDuration: 300,
          duration: 2000,
        });
      })
      .catch((err) => {
        alert(err);
      });
  },
};

export default Utils;
