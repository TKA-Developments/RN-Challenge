import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View, Text } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";
import { ITodo } from "../types";

export default function ToDos({
  todos,
  setTodos,
  toggleEditModal,
  screen,
}: {
  todos: ITodo[];
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        done: boolean;
        description: string;
        date: Date;
      }[]
    >
  >;
  toggleEditModal: (index: number) => void;
  screen: "all" | "completed" | "incompleted";
}) {
  const colorScheme: string = useColorScheme() === "dark" ? "white" : "black";

  const closeRow = (rowMap: RowMap<ITodo>, rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <SwipeListView
      keyExtractor={(e, i) => i.toString()}
      data={todos}
      renderItem={({ item, index }) => {
        const padding = index === todos.length - 1 ? 40 : 0;

        return (screen === "completed" && item.done) ||
          (screen === "incompleted" && !item.done) ||
          screen === "all" ? (
          <View
            style={{
              alignSelf: "center",
              paddingBottom: 0,
            }}
          >
            <View style={{ ...styles.todoContainer }}>
              <TouchableOpacity
                onPress={() => {
                  todos[index].done = !todos[index].done;
                  setTodos([...todos]);
                }}
                style={styles.checkbox}
              >
                <MaterialCommunityIcons
                  name={
                    item.done
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={28}
                  color={colorScheme}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.descriptionContainer}
                onPress={() => {
                  toggleEditModal(index);
                }}
              >
                <Text style={styles.description}>{item.description}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>
        ) : (
          <View></View>
        );
      }}
      renderHiddenItem={({ item, index }, rowMap) => {
        let [month, date, year] = item?.date
          .toLocaleDateString("en-US")
          .split("/");
        let [hour, minute, second] = item?.date
          .toLocaleTimeString("en-US")
          .split(/:| /);
        const padding = index === todos.length - 1 ? 40 : 0;

        return (screen === "completed" && item.done) ||
          (screen === "incompleted" && !item.done) ||
          screen === "all" ? (
          <View style={{ ...styles.hiddenContainer, paddingBottom: 0 }}>
            <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
              {/* <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={colorScheme}
              /> */}
              <Text style={styles.date}>
                Created at: {hour}.{minute} {date}-{month}-
                {year.toString().slice(-2)}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
            >
              <MaterialCommunityIcons
                name="trash-can"
                size={24}
                color={colorScheme}
                onPress={() => {
                  todos.splice(index, 1);
                  setTodos([...todos]);
                  closeRow(rowMap, index);
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        );
      }}
      rightOpenValue={-165}
      stopLeftSwipe={10}
    />
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "red",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  checkbox: {
    paddingRight: 5,
    alignSelf: "stretch",
    // borderWidth: 1,
    // borderColor: "blue",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 2,
    paddingVertical: 7,
    justifyContent: "center",
  },
  description: {
    fontSize: 14,
  },
  hiddenContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 105,
  },
  backRightBtnLeft: {
    right: 55,
    // borderWidth: 1,
    // borderColor: "blue",
    width: 150,
  },
  date: {
    fontSize: 10,
    fontWeight: "400",
  },
  backRightBtnRight: {
    right: 0,
    // borderWidth: 1,
    // borderColor: "pink",
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: "80%",
  },
});
