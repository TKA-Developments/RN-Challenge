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
  updateContent: (newdata: any, id: string) => void;
}

const TodoItem = ({
  todo,
  onSubmit,
  deleteTodo,
  updateContent,
}: TodoItemProps) => {
  const [content, setContent] = useState(todo.content);
  const [isChecked, setIsChecked] = useState(todo.isDone);
  const inputTodo = useRef(null);

  const onKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === "Backspace" && content === "") {
      deleteTodo();
    }
  };

  useEffect(() => {
    if (inputTodo.current) {
      inputTodo?.current?.focus();
    }
  }, [inputTodo]);

  useEffect(() => {
    updateContent(
      {
        ...todo,
        content: content,
        isDone: isChecked,
      },
      todo.id
    );
  }, [content, isChecked]);

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
          defaultValue={todo.content}
          onChangeText={(val) => setContent(val)}
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
