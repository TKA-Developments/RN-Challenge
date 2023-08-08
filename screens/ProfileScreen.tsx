import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { AsyncStorage, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

import EditScreenInfo from "../components/EditScreenInfo";
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name {username}</Text>
      <Text style={styles.title}>Totals {totalCount}</Text>
      <Text style={styles.title}>Completed {completedCount}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <EditScreenInfo path="/screens/ProfileScreen.tsx" />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
