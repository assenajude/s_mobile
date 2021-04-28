import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        loading:  false,
        error: null,
        list: [],
        memberAssociations: [],
        randomIdentity: {}

    },
    reducers: {
        memberRequested: (state,action) => {
            state.loading = true
            state.error = null
        },
        memberRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        memberAssociationReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.memberAssociations=  action.payload
        },
        membersReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        memberAdded: (state, action) => {
            state.loading = false
            state.error = null
            const newAdded = action.payload
            state.list.push(newAdded.new)
            const random = {
                email: newAdded.new.email,
                password: newAdded.randomPass
            }
            state.randomIdentity = random
        }

    }
})

const {memberRequested, memberRequestFailed, memberAssociationReceived,
    memberAdded, membersReceived} = memberSlice.actions
export default memberSlice.reducer

const url = '/members'

export const getMemberAssociations = () => apiRequested({
    url:url+'/associations',
    method: 'get',
    onStart: memberRequested.type,
    onSuccess: memberAssociationReceived.type,
    onError: memberRequestFailed.type
})

export const addNewMember = (data) => apiRequested({
    url,
    data,
    method: 'post',
    onStart: memberRequested.type,
    onSuccess: memberAdded.type,
    onError: memberRequestFailed.type
})

export const getAssociationMembers = (data) => apiRequested({
    url:url+'/all',
    data,
    method: 'post',
    onStart: memberRequested.type,
    onSuccess: membersReceived.type,
    onError: memberRequestFailed.type
})

