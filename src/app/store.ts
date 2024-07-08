import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authReducer from "./features/authSlice";
import notificationReducer from "./features/notificationSlice";
import modalReducer from "./features/modalSlice";
import filterReducer from "./features/filterSlice";
import themeReducer from "./features/themeSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    modal: modalReducer,
    notification: notificationReducer,
    filter: filterReducer,
    themes: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
