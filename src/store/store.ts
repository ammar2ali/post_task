/** @format */

import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./slices/userSlice";
import { persistStore } from "reduxjs-toolkit-persist";
import { RESET_STATE_ACTION_TYPE } from "./resetState";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const reducers = {
  authReducer: authSlice,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
        ],
      },
    }),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
