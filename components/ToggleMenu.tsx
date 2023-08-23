import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { ToggleMenuParamList } from "../types";

export const ToggleMenu = ({
  toggleAdd,
  setToggleAdd,
  setToggleDelete,
  setToggleEdit,
  toggleEdit,
  toggleDelete,
}: ToggleMenuParamList) => (
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
        toggleDelete ? { backgroundColor: "firebrick", borderRadius: 10 } : {}
      }
    />
  </View>
);
