import { View, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Checkbox from "../checkbox";
import { Header } from "@react-navigation/stack";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    isDone: boolean;
  };

  onSubmit: () => void;
}

const TodoItem = ({ todo, onSubmit }: TodoItemProps) => {
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const inputTodo: any = useRef(null);

  const onKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === "Backspace" && content === "") {
      console.warn("delete");
    }
  };

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isDone);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (inputTodo.current) {
      inputTodo?.current?.focus();
    }
  }, [inputTodo]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginVertical: 4,
        }}
      >
        <Checkbox
          isChecked={isChecked}
          onPressed={() => {
            setIsChecked(!isChecked);
          }}
        />

        <TextInput
          multiline
          style={{
            flex: 1,
            color: "black",
            fontSize: 16,
            marginStart: 8,
          }}
          ref={inputTodo}
          value={content}
          onChangeText={setContent}
          onSubmitEditing={onSubmit}
          blurOnSubmit
          onKeyPress={onKeyPress}
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "darkgrey",
          marginStart: 32,
          marginTop: 4,
          alignSelf: "stretch",
        }}
      />
    </>
  );
};

export default TodoItem;
