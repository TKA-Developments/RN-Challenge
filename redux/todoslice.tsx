import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { readFromAsync, storeToAsync } from "./asyncStorageData";

const fetchTodo = createAsyncThunk("fetch", async (key, thunkAPI) => {
  const response = await readFromAsync(key);
  return response;
});

const initialState = {
  completed: false,
  value: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    removeData: (state, action) => {
      let index = state.value.findIndex((e, i) => {
        return e.id == action.payload;
      });

      state.value.splice(index, 1);

      storeToAsync(state.value);
    },
    doneTodo: (state, action) => {
      state.value
        .filter((item?: any) => item.id == action.payload)
        .forEach((v?: any) => {
          v.complete = !v.complete;
          state.completed = v.complete;
        });

      storeToAsync(state.value);
    },
    addTodo: (state, action) => {
      const { task, time } = action.payload;
      state.value.push({
        id: (state.value.length + 1).toString(),
        task,
        time,
        complete: false,
      });

      storeToAsync(state.value);
    },
    editTodo: (state, action) => {
      const { id, task } = action.payload;
      state.value
        .filter((item?: any) => item.id == id)
        .forEach((v?: any) => {
          v.task = task;
        });

      storeToAsync(state.value);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { removeData, doneTodo, addTodo, editTodo } = todoSlice.actions;
export { fetchTodo };

export default todoSlice.reducer;
