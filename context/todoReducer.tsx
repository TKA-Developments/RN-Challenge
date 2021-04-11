import { Alert } from "react-native";
import { TodoLists } from "../types";

export enum TodoActions {
    Add = 'ADD_TODO',
    Remove = 'REMOVE_TODO',
    Update = 'UPDATE_TODO',
    Filter = 'FILTER_TODO',
    UpdateDone = 'UPDATE_TODO_DONE',
    UpdateTempTitle = 'UPDATE_TEMP_TITLE',
    UpdateTempDesc = 'UPDATE_TEMP_DESC',
}

type TodoPayload = {
    [TodoActions.Add] : { 
        id?: number,
        title: string,
        description: string,
        date?: Date,
    }
    [TodoActions.Remove] : {
        id: number,
    }
    [TodoActions.Update] : {
        id: number,
        title: string,
        description: string,
        date?: Date,
        done?: boolean,
    }
    [TodoActions.Filter] : {
        keyword: string,
    }
    [TodoActions.UpdateDone] : {
        id: number,
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
            //if(state.temp == undefined) return
            // if(isEmpty(state.temp?.title) && isEmpty(state.temp?.description)){
            //     state.temp = {
            //         id: 0,
            //         title: '',
            //         description: '',
            //         date: new Date(0),
            //         done: false,
            //     }
            // }
            var count = state.indexCount++
            //var done = state.temp.done == undefined ? false : state.temp.done
            //Alert.alert(`${action.payload.title} ${action.payload.description}`)
            
            return {
                filter: state.filter,
                indexCount: count,
                lists: [
                ...state.lists,
                {
                    id: count,
                    title: action.payload.title,
                    description: action.payload.description,
                    date: new Date(),
                    done: false,
                }
            ]
            }
        case TodoActions.Remove:
            return {
                filter: state.filter,
                indexCount: state.indexCount,
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
                indexCount: state.indexCount,
                lists: [...state.lists]
            }
        case TodoActions.UpdateDone:
            var index = state.lists.findIndex((i) => i.id == action.payload.id)
            state.lists[index].done = !state.lists[index].done
            //Alert.alert(`updateTodo called ! value: ${state.lists[index].done}`);       
        default:
            return state
    }
}
export function isEmpty(value?: string) {
    if (value == undefined) return true
    if (value == null) return true
    if (value.length < 1) return true
    if (value.replace(/ /g, "").length < 1) return true
    return false
}