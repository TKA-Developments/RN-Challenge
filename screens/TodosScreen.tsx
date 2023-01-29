// import firebase from "firebase/compat";
import { concat } from "@apollo/client";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import TodoItem from "../components/todo-item";
import styles from "./stylesTodosScreen";

export default function TodosScreen() {
  // setItemStorage = async () => {
  //   try {
  //     await AsyncStorage.setItem("KEYSTRING", "String need save");
  //   } catch (erorr) {
  //     console.log("Saving data error");
  //   }
  // };

  // getItemStorage = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("TASKS");
  //     if (value !== null) {
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     alert("Retrieving data error");
  //   }
  // };

  const [type, setType] = useState("");
  const [titleList, setTitleList] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "0",
      content: " ",
      isDone: false,
    },
  ]);

  function generateRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const addTodo = () => {
    let now = new Date();
    setTodos((p) => [
      ...p,
      {
        id: `${generateRandomString(6)}-${now.getTime().toString()}`,
        content: "",
        isDone: false,
      },
    ]);
  };

  const deleteTodo = (id: string) => {
    setTodos((p) => p.filter((i) => i.id !== id));
  };

  const filterRule = (i: any) => {
    if (type === "complete") {
      if (i?.isDone) {
        return i;
      }
      return null;
    }
    if (type === "incomplete") {
      if (!i.isDone) {
        return i;
      }
      return null;
    }
    if (type === "" || type === "all") {
      return i;
    }
  };

  const updateContent = (newdata: any, id: string) => {
    setTodos((p) => {
      return p.map((i) => {
        if (i.id === id) {
          return newdata;
        }
        return i;
      });
    });
  };

  useEffect(() => {
    console.log(type);
    console.log(todos);
    console.log(todos.filter(filterRule));

    return () => {};
  }, [todos, filterRule]);

  return (
    <View style={styles.pages}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.title}
          value={titleList}
          onChangeText={setTitleList}
          placeholder={"New List"}
        />
        <View style={styles.navbar}>
          <TouchableOpacity
            style={[
              styles.navbarBtn,
              { backgroundColor: type === "all" ? "darkseagreen" : "white" },
              { borderTopLeftRadius: 5 },
              { borderTopRightRadius: 0 },
              { borderBottomLeftRadius: 5 },
              { borderBottomRightRadius: 0 },
            ]}
            onPress={() => {
              setType("all");
            }}
          >
            <Text
              style={[
                styles.navbarBtnText,
                {
                  color: type === "all" ? "black" : "darkslategrey",
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navbarBtn,
              {
                backgroundColor: type === "complete" ? "darkseagreen" : "white",
              },
            ]}
            onPress={() => {
              setType("complete");
            }}
          >
            <Text
              style={[
                styles.navbarBtnText,
                {
                  color: type === "complete" ? "black" : "darkslategrey",
                },
              ]}
            >
              Complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navbarBtn,
              {
                backgroundColor:
                  type === "incomplete" ? "darkseagreen" : "white",
              },
              { borderTopLeftRadius: 0 },
              { borderTopRightRadius: 5 },
              { borderBottomLeftRadius: 0 },
              { borderBottomRightRadius: 5 },
            ]}
            onPress={() => {
              setType("incomplete");
            }}
          >
            <Text
              style={[
                styles.navbarBtnText,
                {
                  color: type === "incomplete" ? "black" : "darkslategrey",
                },
              ]}
            >
              Incomplete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews={false}
          data={todos.filter(filterRule)}
          keyExtractor={(_i) => _i.id}
          renderItem={({ item, index }) => (
            <TodoItem
              todo={item}
              onSubmit={() => addTodo()}
              deleteTodo={() => deleteTodo(item.id)}
              updateContent={updateContent}
            />
          )}
          style={{ width: "100%" }}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              addTodo();
            }}
          >
            <MaterialIcons name="add" size={24} color="darkslategrey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
