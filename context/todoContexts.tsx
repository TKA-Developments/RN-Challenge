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
    },
    {
        id: 2,
        title: 'Todo 2',
        description: 'Desc of Todo 2',
        done: false,
    },
    {
        id: 3,
        title: 'Todo 3',
        description: 'Desc of Todo 3',
        done: false,
    },
    {
        id: 4,
        title: 'Todo 4',
        description: 'Desc of Todo 4',
        done: false,
    },
    {
        id: 5,
        title: 'Todo 5',
        description: 'Desc of Todo 5',
        done: false,
    },
    {
        id: 6,
        title: 'Todo 6',
        description: 'Desc of Todo 6',
        done: false,
    },
    {
        id: 7,
        title: 'Todo 7',
        description: 'Desc of Todo 7',
        done: false,
    },
    {
        id: 8,
        title: 'Todo 8',
        description: 'Desc of Todo 8',
        done: false,
    },
    {
        id: 9,
        title: 'Todo 9',
        description: 'Desc of Todo 9',
        done: false,
    },
    {
        id: 10,
        title: 'Todo 10',
        description: 'Desc of Todo 10',
        done: false,
    },
    {
        id: 11,
        title: 'Todo 11',
        description: 'Desc of Todo 11',
        done: false,
    },
    {
        id: 12,
        title: 'Todo 12',
        description: 'Desc of Todo 12',
        done: false,
    },
    {
        id: 13,
        title: 'Todo 13',
        description: 'Desc of Todo 13',
        done: false,
    },
    {
        id: 14,
        title: 'Todo 14',
        description: 'Desc of Todo 14',
        done: false,
    },
    {
        id: 15,
        title: 'Todo 15',
        description: 'Desc of Todo 15',
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