import { ToggleFilter } from "./ToggleFilter";
import { ToggleMenu } from "./ToggleMenu";
import React from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import Colors from "../constants/Colors";
import { TodoMenuParamList } from "../types";
import AddTodoItem from "./AddTodoItem";
import { Text } from "./Themed";

export default function TodoMenu({
  filterOptions,
  toggleDelete,
  toggleEdit,
  setFilterOptions,
  setToggleEdit,
  setToggleDelete,
  addItem,
}: TodoMenuParamList) {
  const [searchValue, setSearchValue] = React.useState("");
  const [toggleAdd, setToggleAdd] = React.useState(false);
  const [toggleSearch, setToggleSearch] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 5,
        alignItems: "center",
        padding: 10,
      }}
    >
      <ToggleMenu
        toggleAdd={toggleAdd}
        setToggleAdd={setToggleAdd}
        setToggleDelete={setToggleDelete}
        setToggleEdit={setToggleEdit}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{}}>
          {toggleAdd
            ? "Add Task"
            : toggleEdit
            ? "Edit Task"
            : toggleDelete
            ? "Delete Task"
            : ""}
        </Text>
        {toggleAdd && <AddTodoItem addItem={addItem} />}
      </View>
      <ToggleFilter
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        setToggleSearch={setToggleSearch}
        toggleSearch={toggleSearch}
        setSearchValue={setSearchValue}
      />
      {toggleSearch && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TextInput
            style={styles.inputText}
            onChangeText={(t) => setSearchValue(t)}
            value={searchValue}
          />
          <Button
            title="Search"
            onPress={() => {
              setFilterOptions((prevState) => ({
                ...prevState,
                regexString: searchValue,
              }));
              setToggleSearch(false);
            }}
            color="purple"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 30,
    width: 200,
    color: Colors.dark.text,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
