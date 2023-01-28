import RNDateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather";
import { Button, Divider, Input } from "@rneui/themed";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  Text,
  View,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import { blueColor } from "../constants/Colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type Props = {
  open: boolean;
  closeFunction: any;
  createFunction: any;
};

const { height } = Dimensions.get("window");

const BottomDrawer = forwardRef((props: Props, ref: any) => {
  let drawerPosY = new Animated.Value(height);
  const [dateInfo, setdateInfo] = useState({
    value: new Date(),
    mode: "date",
    show: false,
  } as any);
  const [createData, setcreateData] = useState({
    detail: "",
    date: new Date(),
    time: new Date(Date.now()),
  });

  function swipe(direction: "up" | "down", callback?: any) {
    // console.log("as");

    Animated.timing(drawerPosY, {
      toValue: direction === "down" ? height : 0,
      useNativeDriver: false,
      easing: Easing.ease,
      duration: 500,
    }).start(() => {
      if (callback) callback();
    });
  }
  useImperativeHandle(ref, () => ({
    swipe,
  }));

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateY: drawerPosY }],
      }}
    >
      <Input
        inputStyle={styles.textInput}
        inputContainerStyle={{ borderBottomColor: "transparent" }}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="What do you need to do"
        placeholderTextColor="#8bb2ff"
        onChangeText={val => {
          const tempData = { ...createData };
          tempData.detail = val;
          setcreateData(tempData);
        }}
      />
      <Divider color="white" />
      <View style={{ padding: 20 }}>
        <Text style={styles.datetimeHeader}>Date</Text>
        <Pressable
          onPress={() => {
            // setdatePicker(true);
            setdateInfo({ value: createData.date, mode: "date", show: true });
          }}
          style={styles.datetime}
        >
          <Icon name="calendar" size={20} color="white" />
          <Text style={styles.datetimeInput}>
            {createData.date.toLocaleDateString()}
          </Text>
        </Pressable>
      </View>
      <Divider color="white" />

      <View style={{ padding: 20 }}>
        <Text style={styles.datetimeHeader}>Time</Text>
        <Pressable
          onPress={() => {
            // setdatePicker(true);
            setdateInfo({ value: createData.time, mode: "time", show: true });
          }}
          style={styles.datetime}
        >
          <Icon name="clock" size={20} color="white" />
          <Text style={styles.datetimeInput}>
            {createData.time.toLocaleTimeString()}
          </Text>
        </Pressable>
      </View>
      <Divider color="white" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          marginTop: 40,
        }}
      >
        <Button
          title={"Cancel"}
          size={"md"}
          type="clear"
          titleStyle={{
            color: "white",
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          }}
          containerStyle={{ borderRadius: 15, marginRight: 10, minWidth: 90 }}
          onPress={() => {
            // setcreateData({
            //   detail: "",
            //   date: new Date(),
            //   time: new Date(Date.now()),
            // });
            swipe("down");
          }}
        />
        <Button
          title={"Save"}
          size={"md"}
          type="solid"
          titleStyle={{
            color: "black",
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          }}
          containerStyle={{ borderRadius: 15 }}
          buttonStyle={{
            borderRadius: 15,
            backgroundColor: "white",
            minWidth: 90,
          }}
          onPress={async () => {
            // props.createFunction(createData).then(() => {
            //   swipe("down");
            // });
            swipe("down", async () => {
              await props.createFunction(createData);
            });
            // await props.createFunction(createData, swipe("down"));
          }}
        />
      </View>
      {dateInfo.show && (
        <RNDateTimePicker
          mode={dateInfo.mode}
          value={dateInfo.value}
          onChange={(e, val) => {
            if (val) {
              const tempData = { ...createData };
              if (dateInfo.mode === "date") {
                tempData.date = val;
              } else {
                tempData.time = val;
              }
              setdateInfo({ value: val, mode: dateInfo.mode, show: false });
              setcreateData(tempData);
            }
          }}
        />
      )}

      {/* <DatePicker date={new Date()} /> */}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: height * 0.7,
    backgroundColor: blueColor.normal,
    left: 0,
    right: 0,
    elevation: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.13,
    shadowRadius: 100.62,
    paddingVertical: 50,
  },
  textInput: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins",
    borderBottomWidth: 0,

    textDecorationLine: "none",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  datetime: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  datetimeHeader: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  datetimeInput: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "right",
    marginLeft: "auto",
  },
});

export default BottomDrawer;
