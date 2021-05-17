import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        loading:  false,
        error: null,
        list: [],
        memberAssociations: [],
        memberInfos: [],
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
        allMembersReceived: (state, action) => {
         state.loading = false
         state.error = null
         state.list = action.payload
        },
        memberAssociationReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.memberAssociations=  action.payload
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
        },
        updateOne: (state, action) => {
            state.loading = false
            state.error = null
            const updatedIndex = state.list.findIndex(item => item.id === action.payload.id)
            state.list[updatedIndex] = action.payload
        },
        memberInfosReceived: (state, action) => {
            state.loading = false
            state.error = null
            const infos = action.payload
            state.memberInfos = infos
        }

    }
})

const {memberRequested, memberRequestFailed, memberAssociationReceived,
    memberAdded,updateOne, memberInfosReceived, allMembersReceived} = memberSlice.actions
export default memberSlice.reducer

const url = '/members'

export const getAllMembers = () => apiRequested({
    url,
    method: 'get',
    onStart: memberRequested.type,
    onSuccess: allMembersReceived.type,
    onError: memberRequestFailed.type
})

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


export const getUpdateOneMember = (data) => apiRequested({
    url:url+'/updateOne',
    data,
    method: 'patch',
    onStart: memberRequested.type,
    onSuccess: updateOne.type,
    onError: memberRequestFailed.type
})

export const getMemberInfos = (data) => apiRequested({
    url: url+'/informations',
    data,
    method: 'post',
    onStart: memberRequested.type,
    onSuccess: memberInfosReceived.type,
    onError: memberRequestFailed.type
})

export const readMemberInfos =(data) => apiRequested({
    url:url+'/readInfos',
    data,
    method: 'patch',
    onStart: memberRequested.type,
    onSuccess: memberInfosReceived.type,
    onError: memberRequestFailed.type
})

export const sendAdhesionMessage = (data) => apiRequested({
    url:url+'/sendAdhesionMessage',
    data,
    method: 'patch',
    onStart: memberRequested.type,
    onSuccess: allMembersReceived.type,
    onError: memberRequestFailed.type
})
