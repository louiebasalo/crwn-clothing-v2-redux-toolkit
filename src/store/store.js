// import { compose, createStore, applyMiddleware } from 'redux';

import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ //this getDefaultMiddleware gives us back is the array
      serializableCheck: false, // what this will do is to turn off the default RTK middleware; serializable middleware
    }).concat(middleWares), //concatinte with our own middleware 
});

// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

export const persistor = persistStore(store);
