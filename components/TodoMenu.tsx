import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { TodoMenuParamList } from "../types";

export default function TodoMenu({
  filterOptions,
  toggleDelete,
  toggleEdit,
  setFilterOptions,
  setToggleEdit,
  setToggleDelete,
}: TodoMenuParamList) {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            setToggleEdit(!toggleEdit);
            setToggleDelete(false);
          }}
          title="Toggle Edit"
          color="blue"
        />
        <Button
          onPress={() => {
            setToggleDelete(!toggleDelete);
            setToggleEdit(false);
          }}
          title="Toggle Delete"
          color="red"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            setFilterOptions((prevState) => ({
              ...prevState,
              completed: !prevState.completed,
            }));
          }}
          title={filterOptions.completed ? "Hide Completed" : "Show Completed"}
          color="green"
        />
        <Button
          onPress={() => {
            setFilterOptions((prevState) => ({
              ...prevState,
              incompleted: !prevState.incompleted,
            }));
          }}
          title={filterOptions.incompleted ? "Hide Todo" : "Show Todo"}
          color="gray"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.inputText}
          onChangeText={(t) => setSearchValue(t)}
          value={searchValue}
        />
        {filterOptions.regexString.length > 0 && (
          <Button
            title="x"
            onPress={() => {
              setFilterOptions((prevState) => ({
                ...prevState,
                regexString: "",
              }));
              setSearchValue("");
            }}
            color="gray"
          />
        )}
        <Button
          title="Search"
          onPress={() => {
            setFilterOptions((prevState) => ({
              ...prevState,
              regexString: searchValue,
            }));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  inputText: {
    height: 40,
    width: "70%",
    color: Colors.dark.text,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
