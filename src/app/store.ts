// import { configureStore } from "@reduxjs/toolkit";
// import api from "./api/api";
// import authReducer from "./features/authSlice";
// import notificationReducer from "./features/notificationSlice";
// import modalReducer from "./features/modalSlice";
// import filterReducer from "./features/filterSlice";
// import themeReducer from "./features/themeSlice";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   // whitelist: ["auth"], // Only persist the auth reducer/
// };

// const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     auth: authReducer,
//     modal: modalReducer,
//     notification: notificationReducer,
//     filter: filterReducer,
//     themes: themeReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
//   devTools: process.env.NODE_ENV === "development",
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import api from "./api/api";
import authReducer from "./features/authSlice";
import notificationReducer from "./features/notificationSlice";
import modalReducer from "./features/modalSlice";
import filterReducer from "./features/filterSlice";
import themeReducer from "./features/themeSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  modal: modalReducer,
  notification: notificationReducer,
  filter: filterReducer,
  themes: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist the auth reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
