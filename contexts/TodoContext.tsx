import React, { Context, useState } from 'react';
import { TodoContextParamList } from '../types';

interface ProviderProps {
    children: React.ReactNode;
};

// type ContextProps = {
//     data: any,
//     addTodo: any,
//     onRemove: any,
//     onToggle: any,
//     onEdit: any
// };

const TodoContext = React.createContext<Partial<TodoContextParamList>>({});

export function TodoProvider(props: ProviderProps ){
    const [todos, setTodos] = useState([] as any);

    const addTodo = (text: string) => {
        let currDate = new Date();
        setTodos([
            ...todos,
            {id: Math.random().toString(), taskName: text, completedStatus: false, createdAt: currDate},
        ]);
        console.log(todos);
    };
  
    const onRemove = (id: string) => (e: any) => {
      setTodos(todos.filter((todo: any) => todo.id !== id));
    };
  
    const onToggle = (id: string) => (e: any) => {
      setTodos(
        todos.map( (todo: any) =>
          todo.id === id ? {...todo, completedStatus: !todo.completedStatus} : todo,
        ),
      );
    };
  
    const onEdit = (id: string, newName: string) => (e: any) => {
      console.log("masukkk");
      setTodos(
        todos.map( (todo: any) =>
          todo.id === id ? {...todo, taskName: newName} : todo,
        ),
      );
      console.log(todos);
    };

    return (
        <TodoContext.Provider value={{ data: todos, addTodo, onRemove, onToggle, onEdit}}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoContext;