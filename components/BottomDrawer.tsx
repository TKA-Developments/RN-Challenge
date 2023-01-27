import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Divider, Input } from "@rneui/themed";
import React, { forwardRef, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Animated, Easing } from "react-native";
// import DatePicker from "react-native-date-picker";
import { blueColor } from "../constants/Colors";

type Props = {
  open: boolean;
};

const { width, height } = Dimensions.get("window");

const BottomDrawer = forwardRef((props: Props, ref: any) => {
  // const [heightTranslate, setheightTranslate] = React.useState(new Animated.Value(height))
  let drawerPosY = new Animated.Value(height);
  // const drawerPan = useRef(new Animated.Value(height)).current;

  function swipe(direction: "up" | "down") {
    Animated.timing(drawerPosY, {
      toValue: direction === "up" ? 0 : height,
      useNativeDriver: false,
      easing: Easing.ease,
      duration: 500,
    }).start();
  }

  useEffect(() => {
    if (props.open) {
      swipe("up");
    } else {
      swipe("down");
    }
  }, [props.open]);

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
        placeholderTextColor="#518CFF"
      />
      <RNDateTimePicker mode="time" value={new Date()} />
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textInput: {
    fontSize: 24,
    color: "white",
    // borderColor: "transparent",
    borderBottomWidth: 0,
    // minHeight: 40,
    textDecorationLine: "none",
  },
});

export default BottomDrawer;
