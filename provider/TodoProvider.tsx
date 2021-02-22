import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITodo } from "../types";

const toDo: ITodo[] = [
  {
    done: false,
    description: "Berak di kosan",
    date: new Date(),
  },
  {
    done: false,
    description:
      "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
    date: new Date(),
  },
  {
    done: false,
    description: "Mandi di sumur",
    date: new Date(),
  },
  {
    done: false,
    description: "Berak di kosan",
    date: new Date(),
  },
  {
    done: false,
    description:
      "Berak di kosan, abis itu mandi terus makan abis itu sikat gigi",
    date: new Date(),
  },
  {
    done: false,
    description: "Mandi di sumur",
    date: new Date(),
  },
];

const TodoContext = React.createContext<any>(null);

const TodoProvider = ({ children }: { children: any }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const isMountedVal = useRef(1);

  // useEffect(() => {
  //   console.log("TodoProvider useEffect called");
  //   isMountedVal.current = 1;
  //   if (isMountedVal.current) {
  //     setToDosFromAsyncStorage();
  //   }
  //   return () => {
  //     isMountedVal.current = 0;
  //   };
  // }, []);

  const setToDosFromAsyncStorage = async () => {
    try {
      const result = await AsyncStorage.getItem("todos");
      if (result != null) {
        setTodos(JSON.parse(result));
      }
    } catch (err) {
      alert(err);
    }
  };

  const addTodo = async (inp: string) => {
    setTodos([...todos, { done: false, description: inp, date: new Date() }]);
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      alert(err);
    }
  };

  const editTodo = async (inp: string, index: number) => {
    todos[index].description = inp;
    setTodos([...todos]);
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      alert(err);
    }
  };

  const clearTodos = async () => {
    setTodos([]);
    try {
      await AsyncStorage.setItem("todos", JSON.stringify([]));
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
