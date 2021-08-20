import firebase from "firebase";
import { useState, useEffect } from "react";
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
        alert("Activity Berhasil Diubah");
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
        alert("Great Job, Tugas Kamu Selesai");
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
        alert("Activity Dihapus");
      })
      .catch((err) => {
        alert(err);
      });
  },
};

export default Utils;
