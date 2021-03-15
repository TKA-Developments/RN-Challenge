import React, { useEffect, useState, createContext, ReactNode } from 'react';
import firebase from '../config/firebase';
import _ from 'lodash';
import { getTodayDate, isNDayAfter } from '../utils/datetime';

export interface ITodo {
    id: string,
    title: string,
    date: string,
    checked: boolean,
    category: string,
}



export interface ITodoGroupByDate {
    date: 'string',
    todos: ITodo[],
}

interface ITodoContext {
    todos: ITodoGroupByDate[],
    updateTodo: (todo: ITodo) => void,
    addTodo: (title: string, date: string, category: string) => void,
    deleteTodo: (id: string) => void,
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

interface ProviderProps {
    children: ReactNode,
}

const TodoProvider = ({ children }: ProviderProps) => {
    let today = getTodayDate("Asia/Jakarta");
    const [todos, setTodos] = useState<ITodoGroupByDate[]>([]);
    const todosRef = firebase.firestore().collection('todos');

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        let tempTodos: ITodo[] = [];

        await todosRef.get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    tempTodos.push({
                        id: doc.id,
                        date: doc.data().date,
                        checked: doc.data().checked,
                        title: doc.data().title,
                        category: doc.data().category,
                    });
                });
                // Sort todos by date
                tempTodos.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

                // Using lodash to group todo by date
                const groupedTodosByDate: ITodoGroupByDate[] = _(tempTodos).groupBy((todo: ITodo) => {
                    if (isNDayAfter(new Date(today), new Date(todo.date), 1)) {
                        return 'tomorrow'
                    } else if (todo.date > today) {
                        return 'upcoming';
                    } else if (todo.date < today) {
                        return 'overdue'
                    } else {
                        return 'today';
                    }
                }).map((todos: ITodo[], date: string) => ({ date, todos }));
                console.log('halo');
                setTodos(groupedTodosByDate);
            }).catch(() => {
                console.log('Error detected');
            });
    }

    const updateTodo = async (todo: ITodo) => {
        await todosRef.doc(todo.id).set({
            title: todo.title,
            date: todo.date,
            checked: todo.checked,
            category: todo.category,
        });
        getTodos();
    }

    const addTodo = async (title: string, date: string, category: string) => {
        await todosRef.add({
            title,
            date,
            category,
            checked: false,
        });
        getTodos();
    }

    const deleteTodo = (id: string) => {
        todosRef.doc(id).delete();
        getTodos();
    }

    const value = {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;