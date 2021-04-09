import { TodoLists } from "../types";

export enum TodoActions {
    Add = 'ADD_TODO',
    Remove = 'REMOVE_TODO',
    Update = 'UPDATE_TODO',
    Filter = 'FILTER_TODO',
}

type TodoPayload = {
    [TodoActions.Add] : {
        id: number,
        title: string,
        description: string,
        date: Date,
        done?: boolean,
    }
    [TodoActions.Remove] : {
        id: number,
    }
    [TodoActions.Update] : {
        id: number,
        title: string,
        description: string,
        date: Date,
        done?: boolean,
    }
    [TodoActions.Filter]: {
        keyword: string,
    }
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined 
    ? 
        {
            type: Key
        }
    :
        {
            type: Key
            payload: M[Key]
        }
}

export type TodoListActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>]

export const todoReducer = (
    state: TodoLists,
    action: TodoListActions,
) => {
    
    switch (action.type){
        case TodoActions.Add:
            return {
                filter: state.filter,
                lists: [
                ...state.lists,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    date: action.payload.date,
                    done: action.payload.done
                }
            ]
            }
        case TodoActions.Remove:
            return {
                filter: state.filter,
                lists: [
                ...state.lists.filter(todo => todo.id !== action.payload.id ),
                ]
            }
        case TodoActions.Update:
            var index = state.lists.findIndex((i) => i.id == action.payload.id)
            state.lists[index].title = action.payload.title
            state.lists[index].description = action.payload.description
            state.lists[index].date = action.payload.date
            state.lists[index].done = action.payload.done
            return state
        case TodoActions.Filter:
            return {
                filter: action.payload.keyword,
                lists: [...state.lists]
            }
        default:
            return state
    }
}