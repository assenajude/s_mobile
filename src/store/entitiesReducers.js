import {combineReducers} from "redux";
import memberSlice from './slices/memberSlice'
import associationSlice from './slices/associationSlice'

export default combineReducers({
    member: memberSlice,
    association: associationSlice
})