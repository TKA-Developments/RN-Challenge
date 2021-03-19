import React, { useEffect, useState, createContext, ReactNode, useContext } from 'react';
import firebase from '../config/firebase';
import _ from 'lodash';
import { getTodayDate, isNDayAfter } from '../utils/datetime';
import useColorScheme from '../hooks/useColorScheme';

export interface ITodo {
    id: string,
    title: string,
    date: string,
    checked: boolean,
    category: string,
}

export interface ITodoGroupByDate {
    date: string,
    todos: ITodo[],
}

export interface ICategory {
    id: string,
    title: string,
    color: ICategoryColor
}

interface ICategoryColor {
    light: string,
    dark: string
}

interface ITodoContext {
    todos: ITodo[],
    todosGroupDate: ITodoGroupByDate[],
    search: string,
    categories: ICategory[],
    category: string,
    todoStatus: string,
    showOverdue: boolean,
    loading: boolean,
    updateTodo: (todo: ITodo) => void,
    addTodo: (title: string, date: string, category: string) => void,
    deleteTodo: (id: string) => void,
    updateSearch: (word: string) => void,
    updateStatus: (word: string) => void,
    updateCategory: (word: string) => void,
    getCategoryColor: (word: string) => string,
    toggleOverdue: () => void,
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);
export const useTodoContext = () => {
    return useContext(TodoContext);
}

interface ProviderProps {
    children: ReactNode,
}

const TodoProvider = ({ children }: ProviderProps) => {
    let today = getTodayDate("Asia/Jakarta");
    const [loading, setLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [todosGroupDate, setTodosGroupDate] = useState<ITodoGroupByDate[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([
        { id: '1', title: 'Academic', color: { light: 'crimson', dark: 'pink' } },
        { id: '2', title: 'Intern', color: { light: 'green', dark: 'lightgreen' } },
        { id: '3', title: 'Organization', color: { light: 'gold', dark: 'yellow' } },
        { id: '4', title: 'Fun', color: { light: 'aqua', dark: 'aqua' } },
    ])
    const [search, setSearch] = useState<string>('');
    const [todoStatus, setTodoStatus] = useState<string>('All');
    const [category, setCategory] = useState<string>('All');
    const [showOverdue, setShowOverdue] = useState<boolean>(false);
    const colorScheme = useColorScheme();

    const todosRef = firebase.firestore().collection('todos');

    useEffect(() => {
        const getTodosMounted = async () => {
            setLoading(true);
            await getTodos();
            setLoading(false);
        }
        getTodosMounted();
    }, []);

    useEffect(() => {
        groupTodoByDate();
    }, [todos, search, todoStatus, category, showOverdue]);

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

            if (category != 'All') {
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
        }).map((todos: ITodo[], date: string) => ({ date, todos })).value();
        setTodosGroupDate(groupedTodosByDate);
    }

    const updateTodo = async (todo: ITodo) => {
        // setLoading(true);
        await todosRef.doc(todo.id).set({
            title: todo.title,
            date: todo.date,
            checked: todo.checked,
            category: todo.category,
        });
        await getTodos();
        // setLoading(false);
    }

    const addTodo = async (title: string, date: string, category: string) => {
        setLoading(true);
        await todosRef.add({
            title,
            date,
            category,
            checked: false,
        });
        await getTodos();
        setLoading(false);
    }

    const deleteTodo = async (id: string) => {
        setLoading(true);
        await todosRef.doc(id).delete();
        await getTodos();
        setLoading(false);
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

    const getCategoryColor = (word: string): string => {
        let selected = categories.filter(cat => cat.title === word);
        if (selected.length > 0) {
            return selected[0].color[colorScheme];
        } else {
            return 'white';
        }
    }

    const toggleOverdue = () => {
        setShowOverdue(!showOverdue);
    }

    const value = {
        todos,
        todosGroupDate,
        search,
        categories,
        category,
        todoStatus,
        showOverdue,
        loading,
        addTodo,
        updateTodo,
        deleteTodo,
        updateSearch,
        updateStatus,
        updateCategory,
        getCategoryColor,
        toggleOverdue,
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;