import { combineReducers,configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';// defaults to localStorage for web
import userReducer from './userStore/userSlice';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    user: userReducer,});

const persistConfig = {
    key: 'root',
    storage,
    version : 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
