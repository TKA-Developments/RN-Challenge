import * as React from 'react';
import { TodoLists } from "../types";
import { TodoListActions, todoReducer } from './todoReducer';

export const initState: TodoLists = {
    filter: "",
    indexCount: 15,
    toggle: 1,
    grid: false,
    lists:[
    {
        id: 1,
        title: 'Todo 1',
        description: 'Desc of Todo 1',
        done: false,
        theme: 'amber',
    },
    {
        id: 2,
        title: 'Todo 2',
        description: 'Desc of Todo 2',
        done: false,
        theme: 'lime',
    },
    {
        id: 3,
        title: 'Todo 3',
        description: 'Desc of Todo 3',
        done: false,
        theme: 'yellow',
    },
    {
        id: 4,
        title: 'Todo 4',
        description: 'Desc of Todo 4',
        done: false,
        theme: 'blue',
    },
    {
        id: 5,
        title: 'Todo 5',
        description: 'Desc of Todo 5',
        done: false,
        theme: 'teal',
    },
    {
        id: 6,
        title: 'Todo 6',
        description: 'Desc of Todo 6',
        done: false,
        theme: 'deeppurple',
    },
    {
        id: 7,
        title: 'Todo 7',
        description: 'Desc of Todo 7',
        done: false,
        theme: 'lightgreen',
    },
    {
        id: 8,
        title: 'Todo 8',
        description: 'Desc of Todo 8',
        done: false,
        theme: 'cyan',
    },
    {
        id: 9,
        title: 'Todo 9',
        description: 'Desc of Todo 9',
        done: false,
        theme: 'lime',
    },
    {
        id: 10,
        title: 'Todo 10',
        description: 'Desc of Todo 10',
        done: false,
    },    
    ]}

export const TodoContext = React.createContext<{
    state: TodoLists;
    dispatch: React.Dispatch<TodoListActions>;
}>({
    state: initState,
    dispatch: () => null
})

export const TodoProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(todoReducer, initState)

    return (
        <TodoContext.Provider value = {{state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}