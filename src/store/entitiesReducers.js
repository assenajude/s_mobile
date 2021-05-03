import {combineReducers} from "redux";
import memberSlice from './slices/memberSlice'
import associationSlice from './slices/associationSlice'
import cotisationSlice from './slices/cotisationSlice'

export default combineReducers({
    member: memberSlice,
    association: associationSlice,
    cotisation: cotisationSlice
})