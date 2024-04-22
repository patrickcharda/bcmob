import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import tokenReducer from "./tokenReducer";
import apiReducer from "./apiReducer";
import bcReducer from "./bcReducer";
import pcesAccsReducer from "./pcesAccsReducer";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  persistReducer,
  persistStore,   
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist";

const appReducers = combineReducers({
  tokenReducer,
  apiReducer,
  bcReducer,
  pcesAccsReducer,
});


const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tokenReducer', 'bcReducer', 'pcesAccsReducer'],
  timeout: 200000,
}

const persistedReducer = persistReducer(persistConfig, appReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk, logger),
});

const persistor = persistStore(store)

export default { store, persistor }