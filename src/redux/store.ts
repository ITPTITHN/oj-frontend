import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import noobStorage from "@/redux/storage/noobStorage";
import { combineReducers } from "redux";
import appReducer from "./slices/app.slice";

const storage = typeof window !== "undefined" ? localStorage : noobStorage;

const rootPersistConfig = {
  storage,
  key: "root",
  keyPrefix: "@redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
});


const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
