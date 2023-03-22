import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { blueColor } from "../constants/Colors";
import { Button, Divider, Input } from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  closeFunction: any;
  createFunction: any;
};

const BottomDrawer = forwardRef((props: Props, ref: any) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["70%", "70%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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

  useImperativeHandle(ref, () => ({
    handlePresentModalPress,
  }));

  // renders
  // const renderBackground = ()=>{
  //   return <BottomSheetBackground/>
  // }
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: blueColor.normal,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      // backgroundComponent={<View/>}
    >
      <View style={{ paddingVertical: 20 }}>
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
              handleCloseModalPress();
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
              props.createFunction(createData).then(() => {
                handleCloseModalPress();
              });
              // await props.createFunction(createData, swipe("down"));
            }}
          />
        </View>
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
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  textInput: {
    fontSize: 27,
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
