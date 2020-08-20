import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialState = {};

const middleware = [thunk];

const persistConfig = {
    key: 'auth',
    storage: storage,
    whilelist: ['auth'],
    blacklist: ['error', 'item']
}

const pReducer = persistReducer(persistConfig, rootReducer)


// create store
const store = createStore(pReducer, initialState, composeWithDevTools(
     
        applyMiddleware(...middleware)
    ))
    

const persistor = persistStore(store)

export {persistor, store};
