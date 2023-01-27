import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { blueColor } from "../constants/Colors";
import FilterButton from "./FilterButton";

const filterList = ["all", "done", "undone"];

type Props = {};

const Toolbar = (props: Props) => {
  const [input, setinput] = useState("");
  const [filtered, setfiltered] = useState("all");
  return (
    <View>
      <Input
        leftIcon={{
          type: "font-awesome",
          name: "search",
          color: blueColor.normal,
        }}
        inputContainerStyle={{
          borderColor: blueColor.normal,
        }}
        leftIconContainerStyle={{ marginEnd: 10 }}
        placeholder={"Search..."}
        value={input}
        onChangeText={val => {
          setinput(val);
        }}
      />
      <View style={styles.container}>
        {filterList.map((val, idx) => {
          return (
            <FilterButton
              name={val}
              key={"filter_button-" + idx}
              isSelected={val === filtered}
              filterFunction={() => {
                setfiltered(val);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 40,
    backgroundColor: "transparent",
    marginBottom: 20,
  },
});

export default Toolbar;
