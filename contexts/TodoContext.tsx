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

export interface ICategory {
    title: string,
    color: string
}

interface ITodoContext {
    todos: ITodo[],
    todosGroupDate: ITodoGroupByDate[],
    search: string,
    categories: ICategory[],
    updateTodo: (todo: ITodo) => void,
    addTodo: (title: string, date: string, category: string) => void,
    deleteTodo: (id: string) => void,
    updateSearch: (word: string) => void,
    updateStatus: (word: string) => void,
    updateCategory: (word: string) => void,
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

interface ProviderProps {
    children: ReactNode,
}

const TodoProvider = ({ children }: ProviderProps) => {
    let today = getTodayDate("Asia/Jakarta");
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [todosGroupDate, setTodosGroupDate] = useState<ITodoGroupByDate[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([
        { title: 'Academic', color: 'pink' },
        { title: 'Intern', color: 'green' },
        { title: 'Organization', color: 'yellow' },
    ])
    const [search, setSearch] = useState<string>('');
    const [todoStatus, setTodoStatus] = useState<string>('All');
    const [category, setCategory] = useState<string>('');

    const todosRef = firebase.firestore().collection('todos');

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        groupTodoByDate();
    }, [todos, search, todoStatus, category]);

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

    const groupTodoByDate = () => {
        let tempTodos = todos.filter(todo => {
            let searchFilter;
            let statusFilter;
            let categoryFilter;

            searchFilter = todo.title.includes(search);

            if (todoStatus != 'All') {
                let filterChecked = todoStatus === 'Complete';
                statusFilter = todo.checked === filterChecked;
            } else {
                statusFilter = true;
            }

            if (category) {
                categoryFilter = todo.category === category;
            } else {
                categoryFilter = true;
            }

            return statusFilter && searchFilter && categoryFilter;
        });
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
        setTodosGroupDate(groupedTodosByDate);
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

    const updateSearch = (word: string) => {
        setSearch(word);
    }

    const updateStatus = (word: string) => {
        setTodoStatus(word);
    }

    const updateCategory = (word: string) => {
        setCategory(word);
    }

    const value = {
        todos,
        todosGroupDate,
        search,
        categories,
        addTodo,
        updateTodo,
        deleteTodo,
        updateSearch,
        updateStatus,
        updateCategory
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;