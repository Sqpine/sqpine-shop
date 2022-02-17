import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {itemsPageReducer} from "./Reducers/ShopReducer";
import {itemReducer} from "./Reducers/ItemReducer";
import {itemsCartReducer} from "./Reducers/CartReducer";
import {appReducer} from "./Reducers/AppReducer";

let rootReducer = combineReducers({
    itemsPage: itemsPageReducer,
    itemPage:itemReducer,
    cartPage:itemsCartReducer,
    appPage:appReducer
})
let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
export default store
export type AppRootStateType = ReturnType<typeof rootReducer>