import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import api from "./api/api";
import authReducer from "./features/authSlice";
import notificationReducer from "./features/notificationSlice";
import modalReducer from "./features/modalSlice";
import filterReducer from "./features/filterSlice";
import themeReducer from "./features/themeSlice";
import studentReducer from "./features/studentAdmissionSlice"; // 👈 Import studentSlice

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  modal: modalReducer,
  notification: notificationReducer,
  filter: filterReducer,
  themes: themeReducer,
  student: studentReducer, // 👈 Add student to root reducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // 👈 Only persist auth, student state won't persist unless added here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [api.util.resetApiState.type],
        ignoredPaths: ["modal.content"],
      },
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import api from "./api/api";
// import authReducer from "./features/authSlice";
// import notificationReducer from "./features/notificationSlice";
// import modalReducer from "./features/modalSlice";
// import filterReducer from "./features/filterSlice";
// import themeReducer from "./features/themeSlice";
// import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

// const rootReducer = combineReducers({
//   [api.reducerPath]: api.reducer,
//   auth: authReducer,
//   modal: modalReducer,
//   notification: notificationReducer,
//   filter: filterReducer,
//   themes: themeReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // Only persist the auth reducer
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [api.util.resetApiState.type],
//         ignoredPaths: ["modal.content"],
//       },
//     }).concat(api.middleware),
//   devTools: process.env.NODE_ENV === "development",
// });

// export const persistor = persistStore(store);

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
