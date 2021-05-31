import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        error: null,
        isLoggedIn: false,
        user: {},
        roles: [],
        token: null
    },
    reducers: {
        authRequested: (state, action) => {
            state.loading =  true
            state.error = null
        },
        authRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        authRequestSuccess: (state,action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
            state.roles = action.payload.roles
            state.token = action.payload.accessToken
        },
        userUpdated: (state, action) => {
          state.loading = false,
          state.error = null
          state.user = action.payload
        },
        loggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        },
        logout: (state) => {
                state.isLoggedIn = false,
                state.user = {}
        }
    }

})

const {authRequested, authRequestFailed, authRequestSuccess,
    loggedIn, logout, userUpdated} = authSlice.actions
export default authSlice.reducer

const url = '/auth'

export const register = (data) => apiRequested({
    url: url+'/signup',
    data,
    method: 'post',
    onStart: authRequested.type,
    onSuccess: authRequestSuccess.type,
    onError: authRequestFailed.type
})

export const signin = (data) => apiRequested({
    url:url+'/signin',
    data,
    method: 'post',
    onStart: authRequested.type,
    onSuccess: authRequestSuccess.type,
    onError: authRequestFailed.type
})

export const saveEditInfo = (data) => apiRequested({
    url:'/user/editInfo',
    data,
    method: 'patch',
    onStart: authRequested.type,
    onSuccess: userUpdated.type,
    onError: authRequestFailed.type
})
export const saveEditFund = (data) => apiRequested({
    url:'/user/editFund',
    data,
    method: 'patch',
    onStart: authRequested.type,
    onSuccess: userUpdated.type,
    onError: authRequestFailed.type
})

export const getUserImagesEdit = (data) => apiRequested({
    url:'/user/editImages',
    data,
    method: 'patch',
    onStart: authRequested.type,
    onSuccess: userUpdated.type,
    onError: authRequestFailed.type
})
export const getLoggedIn  = () => dispatch => {
    dispatch(loggedIn())
}

export const getLogout = () => dispatch => {
    dispatch(logout())
}