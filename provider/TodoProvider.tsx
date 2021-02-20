import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = React.createContext(null);

// const TodoProvider = (props) => {
//   const [ToDos, setToDos] = useState([]);

//   const setToDosFromAsync = async () => {
//     try {
//       const result = await AsyncStorage.getItem();
//     }
//   };

//   useEffect(() => {});
// };
