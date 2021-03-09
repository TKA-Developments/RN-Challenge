import moment from "moment";
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Text, View } from "../components/Themed";
import TodoBox from "./TodoBox";

export default function VerticalList(props: {
  todoList?: any;
  selectedDate?: any;
  selectedMenu?: string;
  toggleTodo?: any;
  inputKey?: any;
  toggleEdit?: any;
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.todoList
        ?.filter((item?: any) =>
          props.selectedMenu == "all"
            ? item
            : props.selectedMenu == "complete"
            ? item.complete == true
            : item.complete == false
        )
        .map(
          (item?: any, key?: number) =>
            JSON.stringify(item)
              .toLowerCase()
              .includes(props.inputKey.toLowerCase()) &&
            moment(item.time).isSame(props.selectedDate, "day") && (
              <TodoBox
                todo={item.task}
                key={key}
                id={item.id}
                complete={item.complete}
                toggleTodo={props.toggleTodo}
                toggleEdit={props.toggleEdit}
              />
            )
        )}
    </ScrollView>
  );
}
