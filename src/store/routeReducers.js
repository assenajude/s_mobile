import {combineReducers} from "redux";
import entitiesReducers from "./entitiesReducers";
import authSlice from './slices/authSlice'

export default combineReducers({
    entities: entitiesReducers,
    auth: authSlice
})