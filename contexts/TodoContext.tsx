import React, { useEffect, useState, createContext, ReactNode } from 'react';
import firebase from '../config/firebase';

export interface ITodo {
    id: string,
    title: string,
    date: string,
    checked: boolean,
    category: string,
}

interface ITodoContext {
    todos: ITodo[],
    updateTodoChecked: (id: string, checked: boolean) => void,
    addTodo: (title: string, date: string, category: string) => void,
    deleteTodo: (id: string) => void,
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

interface ProviderProps {
    children: ReactNode,
}

const TodoProvider = ({ children }: ProviderProps) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
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
                setTodos(tempTodos);
            }).catch(() => {
                console.log('Error detected');
            });
    }

    const updateTodoChecked = (id: string, checked: boolean) => {

        todosRef.doc(id).update({
            checked: !checked,
        });
        getTodos();
    }

    const addTodo = (title: string, date: string, category: string) => {
        todosRef.add({
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
        updateTodoChecked,
        deleteTodo,
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;