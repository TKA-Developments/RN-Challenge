import { Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { blueColor } from "../constants/Colors";
import FilterButton from "./FilterButton";

const filterList = ["all", "done", "undone"];

type Props = {
  data: Array<any>;
  setdataFiltered: any;
};

const Toolbar = (props: Props) => {
  const [input, setinput] = useState("");
  const [filtered, setfiltered] = useState("all");
  const filterByInput = (inputVal: string, item: any) => {
    return item.detail.toLowerCase().includes(inputVal.toLowerCase());
  };

  const filterByCategory = (category: string, item: any) => {
    if (category === "done") {
      return item.done === true;
    }
    if (category === "undone") {
      return item.done === false;
    }
    return true;
  };

  useEffect(() => {
    props.setdataFiltered(
      props.data.filter(
        val => filterByCategory(filtered, val) && filterByInput(input, val)
      )
    );
  }, [filtered, input]);

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
