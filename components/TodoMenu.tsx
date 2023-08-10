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
    <View style={{ flexDirection: "column", marginTop: 5, alignItems:"center", padding:10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <SvgXml
          xml={`
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill=${
            toggleAdd ? "black" : "limegreen"
          } 
          d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q37 0 71.5-7t66.5-21l45 46q-41 20-87 31t-96 11Zm290-90v-120H650v-60h120v-120h60v120h120v60H830v120h-60ZM421-298 256-464l45-45 120 120 414-414 46 45-460 460Z"/></svg>`}
          width="40"
          height="30"
          onPress={() => {
            setToggleAdd(!toggleAdd);
            setToggleDelete(false);
            setToggleEdit(false);
          }}
          style={
            toggleAdd ? { backgroundColor: "limegreen", borderRadius: 10 } : {}
          }
        />
        <SvgXml
          xml={`
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill=${
            toggleEdit ? "black" : "royalblue"
          } d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>              `}
          width="40"
          height="30"
          onPress={() => {
            setToggleEdit(!toggleEdit);
            setToggleDelete(false);
            setToggleAdd(false);
          }}
          style={
            toggleEdit ? { backgroundColor: "royalblue", borderRadius: 10 } : {}
          }
        />
        <SvgXml
          xml={`
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path fill=${
            toggleDelete ? "black" : "firebrick"
          } d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
              `}
          width="40"
          height="30"
          onPress={() => {
            setToggleDelete(!toggleDelete);
            setToggleEdit(false);
            setToggleAdd(false);
          }}
          style={
            toggleDelete
              ? { backgroundColor: "firebrick", borderRadius: 10 }
              : {}
          }
        />
      </View>
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
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <Text>{"Showing "}</Text>
        <TouchableOpacity
          onPress={() => {
            setFilterOptions((prevState) => ({
              ...prevState,
              completed: !prevState.completed,
            }));
          }}
        >
          {filterOptions.completed ? (
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, backgroundColor: "darkslategray" },
              ]}
            >
              <Text>Completed</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path
                fill=${"greenyellow"}  
              d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          ) : (
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, borderColor: "dimgray" },
              ]}
            >
              <Text>Completed</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path 
                fill=${"red"} 
                d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilterOptions((prevState) => ({
              ...prevState,
              incompleted: !prevState.incompleted,
            }));
          }}
        >
          {filterOptions.incompleted ? (
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, backgroundColor: "midnightblue" },
              ]}
            >
              <Text>To Do</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path
                fill=${"greenyellow"}  
              d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          ) : (
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, borderColor: "dimgray" },
              ]}
            >
              <Text>To Do</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path 
                fill=${"red"} 
                d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          )}
        </TouchableOpacity>
        {filterOptions.regexString.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setFilterOptions((prevState) => ({
                ...prevState,
                regexString: "",
              }));
              setToggleSearch(false);
              setSearchValue("");
            }}
          >
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, backgroundColor: "lightslategrey" },
              ]}
            >
              <Text>'{filterOptions.regexString}'</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path 
                 fill=${"indigo"} d="M270-80q-78 0-134-56T80-270q0-78 56-134t134-56q78 0 134 56t56 134q0 78-56 134T270-80Zm566-40L573-383q-14 11-31.5 21.5T508-344q-5-14-11-28.5T483-399q54-21 91.5-69.5T612-584q0-81-57-138.5T417-780q-82 0-139.5 57.5T220-584q0 17 3.5 35.5T232-517q-13 2-29 6.5T174-500q-7-18-10.5-40t-3.5-44q0-107 75-181.5T417-840q106 0 180.5 75T672-584q0 43-15 85t-41 73l264 262-44 44Zm-635-56 69-69 68 68 23-23-69-69 71-71-23-23-70 70-70-70-23 23 70 70-70 70 24 24Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setToggleSearch(!toggleSearch);
              setSearchValue("");
            }}
          >
            <View
              style={[
                styles.filterItem,
                { borderWidth: 1, borderColor: "lightslategrey" },
              ]}
            >
              <Text>Search</Text>
              <SvgXml
                xml={`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path 
                 fill=${"mediumpurple"} d="M270-80q-78 0-134-56T80-270q0-78 56-134t134-56q78 0 134 56t56 134q0 78-56 134T270-80Zm566-40L573-383q-14 11-31.5 21.5T508-344q-5-14-11-28.5T483-399q54-21 91.5-69.5T612-584q0-81-57-138.5T417-780q-82 0-139.5 57.5T220-584q0 17 3.5 35.5T232-517q-13 2-29 6.5T174-500q-7-18-10.5-40t-3.5-44q0-107 75-181.5T417-840q106 0 180.5 75T672-584q0 43-15 85t-41 73l264 262-44 44Zm-635-56 69-69 68 68 23-23-69-69 71-71-23-23-70 70-70-70-23 23 70 70-70 70 24 24Z"/></svg>`}
                width="20"
                height="20"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {toggleSearch && (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical:10}}>
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
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  inputText: {
    height: 30,
    width: 200,
    color: Colors.dark.text,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});
