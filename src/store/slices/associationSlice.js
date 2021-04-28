import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const associationSlice = createSlice({
    name: 'association',
    initialState: {
        loading: false,
        error: null,
        list: [],
        selectedAssociation: {},
        selectedAssociationMembers: []
    },
    reducers: {
        associationRequested: (state) => {
            state.loading = true
            state.error = null
        },
        associationRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        associationReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        associationAdded: (state, action) => {
            state.loading = false
            state.error = null
            const newAdded = action.payload
            state.list.push(newAdded)
        },
        selectedAssociationSet: (state, action) => {
            state.selectedAssociation = action.payload
        }

    }
})

const {associationAdded, associationReceived,
    associationRequested, associationRequestFailed,
    selectedAssociationSet} = associationSlice.actions

export default associationSlice.reducer

const url = '/associations'

export const getAllAssociation = () => apiRequested({
    url,
    method: 'get',
    onStart: associationRequested.type,
    onSuccess: associationReceived.type,
    onError: associationRequestFailed.type
})

export const addNewAssociation = (data) => apiRequested({
    url,
    data,
    method: 'post',
    onStart: associationRequested.type,
    onSuccess: associationAdded.type,
    onError: associationRequestFailed.type
})

export const sendAdhesionMessage = (data) => apiRequested({
    url:url+'/sendMessage',
    data,
    method: 'patch',
    onStart: associationRequested.type,
    onSuccess: associationReceived.type,
    onError: associationRequestFailed.type
})



export const setSelectedAssociation = (association) => dispatch => {
    dispatch(selectedAssociationSet(association))
}