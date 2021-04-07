import { Todo, TodoLists } from "../types";

export enum TODO_LIST_ACTION_TYPES {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
}

type TodoPayload = {
    [TODO_LIST_ACTION_TYPES.ADD_TODO] : {
        id: number,
        title: string,
        description: string,
        date: Date,
        done?: boolean,
    }
    [TODO_LIST_ACTION_TYPES.REMOVE_TODO] : {
        id: number,
    }
    [TODO_LIST_ACTION_TYPES.UPDATE_TODO] : {
        id: number,
        title: string,
        description: string,
        date: Date,
        done?: boolean,
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
        case TODO_LIST_ACTION_TYPES.ADD_TODO:
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    date: action.payload.date,
                    done: action.payload.done
                }
            ]
        case TODO_LIST_ACTION_TYPES.REMOVE_TODO:
            return[
                ...state.filter(todo => todo.id !== action.payload.id ),
            ]
        case TODO_LIST_ACTION_TYPES.UPDATE_TODO:
            var index = state.findIndex((i) => i.id == action.payload.id)
            state[index].title = action.payload.title
            state[index].description = action.payload.description
            state[index].date = action.payload.date
            state[index].done = action.payload.done
            return state
        default:
            return state
    }
}