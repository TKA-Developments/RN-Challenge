import { Button, Divider } from "@rneui/themed";
import * as React from "react";
import { StyleSheet } from "react-native";

import { View as RootView } from "../components/Themed";
import { TextInput, Text, Pressable, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { blueColor } from "../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";

export default function EditTodo({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { itemValue } = route?.params;
  console.log(itemValue);

  const [itemVal, setitemVal] = React.useState(itemValue);
  const [data, setdata] = React.useState([]);
  const { setItem, getItem } = useAsyncStorage("@todolist_storage");
  const [dateInfo, setdateInfo] = React.useState({
    show: false,
    mode: "date",
    value: new Date(),
  });

  const updateItemVal = (property: any, newValue: any) => {
    const tempItem = { ...itemVal };
    tempItem[property] = newValue;
    setitemVal(tempItem);
  };

  const getToDoData = async () => {
    try {
      const item = await getItem();
      // console.log(item);

      if (item) {
        setdata(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateToDoDetail = async () => {
    const tempData: any = [...data];
    const itemIdx = tempData.findIndex((val: any) => val.id === itemValue.id);
    tempData[itemIdx] = itemVal;
    console.log(itemVal);

    try {
      await setItem(
        JSON.stringify(tempData),
        navigation.navigate("Todo", { token: uuid.v4() })
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (itemValue) {
      const tempItem = { ...itemVal };
      tempItem.date = new Date(itemVal.date);
      tempItem.time = new Date(itemVal.time);
      setitemVal(tempItem);
    }
  }, [itemValue]);

  React.useEffect(() => {
    getToDoData();
  }, []);

  return (
    <RootView style={styles.container}>
      <Divider color="#515050" style={{ width: "100%", marginBottom: 10 }} />
      <View
        style={{ paddingVertical: 15, width: "100%", paddingHorizontal: 20 }}
      >
        <TextInput
          multiline
          style={{ width: "100%", fontSize: 20, fontFamily: "Poppins" }}
          value={itemVal.detail}
          onChangeText={val => {
            updateItemVal("detail", val);
          }}
          placeholder="Todo"
        />
      </View>
      <Divider
        color="#515050"
        style={{ width: "100%", marginTop: "auto", marginBottom: 2 }}
      />
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Text style={styles.datetimeHeader}>Date</Text>
        <Pressable
          onPress={() => {
            setdateInfo({ value: itemVal.date, mode: "date", show: true });
          }}
          style={styles.datetime}
        >
          <Icon name="calendar" size={20} color="black" />
          <Text style={styles.datetimeInput}>
            {new Date(itemVal.time).toLocaleDateString()}
          </Text>
        </Pressable>
      </View>
      {/* <Divider color="#515050" style={{ width: "100%" }} /> */}

      <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
        <Text style={styles.datetimeHeader}>Time</Text>
        <Pressable
          onPress={() => {
            setdateInfo({ value: itemVal.time, mode: "time", show: true });
          }}
          style={styles.datetime}
        >
          <Icon name="clock" size={20} color="black" />
          <Text style={styles.datetimeInput}>
            {new Date(itemVal.time).toLocaleTimeString()}
          </Text>
        </Pressable>
      </View>
      <Divider color="#515050" style={{ width: "100%" }} />

      <View style={{ width: "100%", marginTop: 20 }}>
        <Button
          title={"Save"}
          size={"md"}
          type="solid"
          titleStyle={{
            color: "white",
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
          }}
          containerStyle={{
            borderRadius: 15,
            marginTop: "auto",
            marginBottom: 20,
            marginHorizontal: 20,
          }}
          buttonStyle={{
            borderRadius: 15,
            backgroundColor: blueColor.normal,
            minWidth: 90,
            // width: "100%",
          }}
          onPress={updateToDoDetail}
        />
      </View>
      {dateInfo.show && (
        <RNDateTimePicker
          mode={dateInfo.mode as any}
          value={dateInfo.value}
          onChange={(e, val) => {
            if (val) {
              const tempData = { ...itemVal };
              if (dateInfo.mode === "date") {
                tempData.date = val;
              } else {
                tempData.time = val;
              }
              setdateInfo({ value: val, mode: dateInfo.mode, show: false });
              setitemVal(tempData);
            }
          }}
        />
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    position: "relative",
    // elevation: 20,
    // shadowColor: "transparent",
  },
  datetime: {
    borderBottomColor: "#515050",
    borderBottomWidth: 1,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  datetimeHeader: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    width: "100%",
  },
  datetimeInput: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "right",
    marginLeft: "auto",
    width: "100%",
  },
});
