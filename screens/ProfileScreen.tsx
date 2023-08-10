import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  Image,
  Share,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";

import { Text, View } from "../components/Themed";

export default function ProfileScreen() {
  var Datastore = require("react-native-local-mongodb");
  var db = new Datastore({
    filename: "asyncStorageKey",
    storage: AsyncStorage,
    autoload: true,
  });
  var dbUser = new Datastore({
    filename: "asyncStorageUserKey",
    storage: AsyncStorage,
    autoload: true,
  });
  const isFocused = useIsFocused();
  const [completedCount, setCompletedCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [username, setUsername] = React.useState("anon");
  React.useEffect(() => {
    db.find({ completed: true }, function (_err: any, docs: any) {
      setCompletedCount(docs.length);
    });
    db.find({}, function (_err: any, docs: any) {
      setTotalCount(docs.length);
    });
    dbUser.find({}, function (_err: any, docs: any) {
      if (docs.length) setUsername(docs[0].username);
      else dbUser.insert({ username: "anon" });
    });
  }, [isFocused]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `I have been using "Simple ToDo" and have completed ${completedCount} tasks! Download now at Play Store google.com`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.ibb.co/gdRLD4M/pixel-duck.png",
          method: "POST",
          headers: {
            Pragma: "no-cache",
          },
          body: "Your Body goes here",
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.title}>Welcome, {username}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.statBox}>
        <Text style={styles.statsTitle}>Task count</Text>
        <View style={styles.statsRow}>
          <Text style={styles.body}>To Do</Text>
          <Text style={styles.body}>{totalCount - completedCount}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.body}>Completed</Text>
          <Text style={styles.body}>{completedCount}</Text>
        </View>
        <View style={[styles.statsRow, { marginTop: 5 }]}>
          <Text style={styles.body}>Total</Text>
          <Text style={styles.body}>{totalCount}</Text>
        </View>
      </View>
      <Button title="Share Profile" onPress={onShare} color="purple" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsTitle: {
    fontSize: 16,
    paddingVertical: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  statBox: {
    width: "70%",
    marginBottom: 20,
  },
});
