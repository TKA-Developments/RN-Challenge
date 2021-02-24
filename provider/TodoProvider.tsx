import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITodo, ITodoContext } from "../types";

const TodoContext = React.createContext<any>(null);

const TodoProvider = ({ children }: { children: any }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    console.log("TodoProvider useEffect called");
    setToDosFromAsyncStorage();
  }, []);

  const setToDosFromAsyncStorage = async () => {
    try {
      const result = await AsyncStorage.getItem("todos");
      if (result != null) {
        const data = await JSON.parse(result);
        setTodos(data);
      }
    } catch (err) {
      alert(err);
    }
  };

  const addTodo = async (inp: string) => {
    const newTodo = [
      ...todos,
      { done: false, description: inp, date: new Date().toDateString() },
    ];

    setTodos(newTodo);

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodo));
    } catch (err) {
      alert(err);
    }
  };

  const editTodo = async (inp: string, index: number) => {
    todos[index].description = inp;
    const newTodo = [...todos];

    setTodos(newTodo);

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodo));
    } catch (err) {
      alert(err);
    }
  };

  const setDone = async (index: number) => {
    todos[index].done = !todos[index].done;
    const newTodo = [...todos];

    setTodos(newTodo);

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodo));
    } catch (err) {
      alert(err);
    }
  };

  const removeTodo = async (index: number) => {
    todos.splice(index, 1);
    const newTodo = [...todos];

    setTodos(newTodo);

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodo));
    } catch (err) {
      alert(err);
    }
  };

  const clearTodos = async () => {
    const newTodo: ITodo[] = [];

    setTodos(newTodo);

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodo));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        editTodo,
        clearTodos,
        setDone,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
