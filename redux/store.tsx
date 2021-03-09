import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from "./todoslice";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
