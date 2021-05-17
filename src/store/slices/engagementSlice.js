import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const engagementSlice = createSlice({
    name: 'engagement',
    initialState: {
        loading: false,
        error: null,
        list: []
    },
    reducers: {
        engagementRequested: (state) => {
            state.loading = true
            state.error = null
        },
        engagementRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        engagementAdded: (state, action) => {
            state.loading = false
            state.error = null
            state.list.push(action.payload)
        },
        engagementsReceived: (state, action) => {
            state.loading = false
            state.error = null
            const receiveds = action.payload
            state.list = receiveds
        },
        showDetails: (state, action) => {
            let selectedEngage = state.list.find(engage => engage.id === action.payload.id)
            selectedEngage.showDetail = !selectedEngage.showDetail
            const others = state.list.filter(item => item.id !== selectedEngage.id)
            others.forEach(engagement => engagement.showDetail = false)
        }
    }
})

export default engagementSlice.reducer
const {engagementAdded, engagementRequested, engagementRequestFailed,
    engagementsReceived, showDetails} = engagementSlice.actions

const url = '/engagements'

export const addNewEngagement = (data) => apiRequested({
    url,
    data,
    method: 'post',
    onStart: engagementRequested.type,
    onSuccess: engagementAdded.type,
    onError: engagementRequestFailed.type
})

export const getEngagementsByAssociation = (data) => apiRequested({
    url: url+'/byAssociation',
    data,
    method: 'post',
    onStart: engagementRequested.type,
    onSuccess: engagementsReceived.type,
    onError: engagementRequestFailed.type
})

export const getEngagementDetail = (engagement) => dispatch => {
    dispatch(showDetails(engagement))
}