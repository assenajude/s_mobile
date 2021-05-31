import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";

const engagementSlice = createSlice({
    name: 'engagement',
    initialState: {
        loading: false,
        error: null,
        list: [],
        tranches: [],
        votesList: {}
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
            state.votesList[action.payload.id] = action.payload
        },
        engagementsReceived: (state, action) => {
            state.loading = false
            state.error = null
            const receiveds = action.payload
            state.list = receiveds
            receiveds.forEach(item => {
                const newTranches = state.tranches.concat(item.tranches)
                state.tranches = newTranches
            })
        },
        engagementVoted: (state, action) => {
          // const updateIndex = state.votesList[action.payload.id]
          state.votesList[action.payload.id] = action.payload.engagements
        },
        votesReceived: (state, action) => {
          state.error = null
          state.loading = false
          state.votesList = action.payload
        },
        showTranches :(state, action) => {
            let selected = state.list.find(item => item.id === action.payload.id)
            selected.showTranches = !selected.showTranches
        },
        showDetails: (state, action) => {
            let selectedEngage = state.list.find(engage => engage.id === action.payload.id)
            selectedEngage.showDetail = !selectedEngage.showDetail
            const others = state.list.filter(item => item.id !== selectedEngage.id)
            others.forEach(engagement => engagement.showDetail = false)
        },
        payingTranche: (state, action) => {
            let selectedTranche = state.tranches.find(tranche => tranche.id === action.payload.id)
            selectedTranche.paying = !selectedTranche.paying
        },
        tranchePayed: (state, action) => {
            state.loading = false
            state.error = null
            const updatedIndex = state.tranches.findIndex(item => item.id === action.payload.id)
            state.tranches[updatedIndex] = action.payload
        }
    }
})

export default engagementSlice.reducer
const {engagementAdded, engagementRequested, engagementRequestFailed,payingTranche,
    engagementsReceived, showDetails, engagementVoted, votesReceived, showTranches, tranchePayed} = engagementSlice.actions

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

export const voteEngagement = (data) => apiRequested({
    url: url+'/vote',
    data,
    method: 'patch',
    onStart: engagementRequested.type,
    onSuccess: engagementVoted.type,
    onError: engagementRequestFailed.type
})

export const getAllVotes = (data) => apiRequested({
    url: url+'/allVotes',
    data,
    method: 'post',
    onStart: engagementRequested.type,
    onSuccess: votesReceived.type,
    onError: engagementRequestFailed.type
})

export const getTranchePayed = (data) => apiRequested({
    url: url+'/payTranche',
    data,
    method: 'patch',
    onStart: engagementRequested.type,
    onSuccess: tranchePayed.type,
    onError: engagementRequestFailed.type
})

export const getEngagementDetail = (engagement) => dispatch => {
    dispatch(showDetails(engagement))
}

export const showEngagementTranches = (engagement) => dispatch => {
    dispatch(showTranches(engagement))
}

export const getPayingTranche =(tranche) => dispatch => {
    dispatch(payingTranche(tranche))
}
