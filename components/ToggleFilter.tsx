import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { FilterOptions, ToggleFilterParamList } from "../types";
import { Text } from "./Themed";

export const ToggleFilter = ({
  setFilterOptions,
  filterOptions,
  setToggleSearch,
  toggleSearch,
  setSearchValue,
}: ToggleFilterParamList) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text>{"Showing "}</Text>
    <TouchableOpacity
      onPress={() => {
        setFilterOptions((prevState: FilterOptions) => ({
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
        setFilterOptions((prevState: FilterOptions) => ({
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
          setFilterOptions((prevState: FilterOptions) => ({
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
);
const styles = StyleSheet.create({
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});
