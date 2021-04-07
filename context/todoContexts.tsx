import * as React from 'react';
import { TodoLists } from "../types";
import { TodoListActions, todoReducer } from './todoReducer';

export const initState: TodoLists = 
[
    {
        id: Date.now() / 1000,
        title: 'Todo 1',
        description: 'Description of Todo 1',
        date: new Date(),
        done: false,
    }
];

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

// export const addTodo = (
//     id: number,
//     title: string,
//     description: string,
//     date: Date,
//     done?: boolean,):
//     AddTodoAction => ({
//         type: TODO_LIST_ACTION_TYPES.ADD_TODO,
//         todoData: {id, title, description, date, done}
//     });

// export const removeTodo = (
//     id: number):
//     RemoveTodoAction => ({
//         type: TODO_LIST_ACTION_TYPES.REMOVE_TODO,
//         id: id
//     });

// export const updateTodo = (
//     id: number,
//     title: string,
//     description: string,
//     date: Date,
//     done?: boolean,):
//     UpdateTodoAction => ({
//         type: TODO_LIST_ACTION_TYPES.UPDATE_TODO,
//         todoData: {id, title, description, date, done}
//     });

