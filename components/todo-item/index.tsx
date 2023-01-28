import { View, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Checkbox from "../checkbox";
import styles from "./styles";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    isDone: boolean;
  };

  onSubmit: () => void;
  deleteTodo: () => void;
}

const TodoItem = ({ todo, onSubmit, deleteTodo }: TodoItemProps) => {
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const inputTodo: any = useRef(null);

  const onKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === "Backspace" && content === "") {
      deleteTodo();
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
      <View style={styles.container}>
        <Checkbox
          isChecked={isChecked}
          onPressed={() => {
            setIsChecked(!isChecked);
          }}
        />

        <TextInput
          multiline
          style={styles.textContent}
          ref={inputTodo}
          value={content}
          onChangeText={setContent}
          onSubmitEditing={onSubmit}
          blurOnSubmit
          onKeyPress={onKeyPress}
        />
      </View>
      <View style={styles.separator} />
    </>
  );
};

export default TodoItem;
