import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITodo } from "../types";

// const toDo: ITodo[] = [
//   {
//     done: false,
//     description: "Berak di kosan",
//     date: new Date().toDateString(),
//   },
//   {
//     done: false,
//     description:
//       "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
//     date: new Date().toDateString(),
//   },
//   {
//     done: false,
//     description: "Mandi di sumur",
//     date: new Date().toDateString(),
//   },
//   {
//     done: false,
//     description: "Berak di kosan",
//     date: new Date().toDateString(),
//   },
//   {
//     done: false,
//     description:
//       "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
//     date: new Date().toDateString(),
//   },
//   {
//     done: false,
//     description: "Mandi di sumur",
//     date: new Date().toDateString(),
//   },
// ];

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
      value={{ todos, setTodos, addTodo, editTodo, clearTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
