import {createSlice} from "@reduxjs/toolkit";
import {apiRequested} from "../actionsCreators/apiActionCreator";
import dayjs from "dayjs";

const cotisationSlice = createSlice({
    name: 'cotisation',
    initialState: {
        loading: false,
        error: null,
        list: [],
        memberYearCotisations: [],
        selectedMonthCotisations: [],
        years: [],
        months: []
    },
    reducers: {
        cotisationRequested: (state, action) => {
            state.loading = true
            state.error = null
        },
        cotisationRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        cotisationAdded: (state, action) => {
          state.loading = false
          state.error = null
            state.list.push(action.payload)
        },
        cotisationReceived: (state, action) => {
          state.loading = false
          state.error = null
          state.list = action.payload
        },
        initTimeData: (state, action) => {
            state.years = action.payload.years
            state.months = action.payload.months
        },
        selectYear: (state, action) => {
            let selectedYear = state.years.find(item => item.year === action.payload.year)
            selectedYear.selected = true
            const otherItems = state.years.filter(item => item.year !== selectedYear.year)
            otherItems.forEach(item => item.selected = false)
            const memberCotisations = state.list.filter(cotis => cotis.memberId === action.payload.memberId)
            const newCotisationTab = []
            memberCotisations.forEach(cotisation => {
                const creationDate = cotisation.createdAt
                const creationYear = dayjs(creationDate).year()
                if(creationYear === selectedYear.year) {
                    newCotisationTab.push(cotisation)
                  }
            })
                state.memberYearCotisations = newCotisationTab
        },
        showMonthDetail: (state, action) => {
            const selectedCotisation = state.memberYearCotisations.filter(cotisation => {
                const cotisationdate = cotisation.createdAt
                const cotisationMonth = dayjs(cotisationdate).month()
                if(cotisationMonth === action.payload.number) return true
                return false
            })
            state.selectedMonthCotisations = selectedCotisation
            let selectedMonth = state.months.find(item => item.label === action.payload.label)
            selectedMonth.showDetail = !selectedMonth.showDetail
            const otherMonths = state.months.filter(item => item.label !== selectedMonth.label)
            otherMonths.forEach(item => item.showDetail = false)
        }
    }
})

export default cotisationSlice.reducer
const {initTimeData, selectYear, showMonthDetail,
    cotisationAdded, cotisationRequested,
    cotisationRequestFailed, cotisationReceived} = cotisationSlice.actions

const url = '/cotisations'

export const addNewCotisation =(data) => apiRequested({
    url,
    data,
    method: 'post',
    onStart: cotisationRequested.type,
    onSuccess: cotisationAdded.type,
    onError: cotisationRequestFailed.type
})

export const getAllCotisations = (associationId) => apiRequested({
    url: url+'/all',
    method: 'post',
    data: associationId,
    onStart: cotisationRequested.type,
    onSuccess: cotisationReceived.type,
    onError: cotisationRequestFailed.type
})

export const populateTimeData = (data) => dispatch => {
    dispatch(initTimeData(data))
}

export const getYearSelected = (year) => dispatch => {
    dispatch(selectYear(year))
}

export const getMonthDetails = (month) => dispatch => {
    dispatch(showMonthDetail(month))
}