import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployeeDetail } from './employeeDetail.action'
import { addEmployeeDetail } from './employeeDetail.action'
import { editEmployeeDetail } from './employeeDetail.action'
import { deleteEmployeeDetail } from './employeeDetail.action'

const fetchEmployeeDetailExtraReducer = {
    [fetchEmployeeDetail.pending]: (state, action) => {
        state.loading = true
    },
    [fetchEmployeeDetail.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchEmployeeDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const addEmployeeDetailExtraReducer = {
    [addEmployeeDetail.pending]: (state, action) => {
        state.loading = true
    },
    [addEmployeeDetail.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addEmployeeDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const editEmployeeDetailExtraReducer = {
    [editEmployeeDetail.pending]: (state, action) => {
        state.loading = true
    },
    [editEmployeeDetail.fulfilled]: (state, action) => {
        const { id, name, empEmail } = action.payload
        const existingEmployeeDetail = state.entities.find(
            (employeeDetail) => employeeDetail.id.toString() === id.toString()
        )
        if (existingEmployeeDetail) {
            existingEmployeeDetail.name = name
            existingEmployeeDetail.empEmail = empEmail
        }
        state.loading = false
    },
    [editEmployeeDetail.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteEmployeeDetailExtraReducer = {
    [deleteEmployeeDetail.pending]: (state, action) => {
        state.loading = true
    },
    [deleteEmployeeDetail.fulfilled]: (state, action) => {
        const id = action.payload
        const existingEmployeeDetail = state.entities.find(
            (employeeDetail) => employeeDetail.id.toString() === id.toString()
        )
        if (existingEmployeeDetail) {
            state.entities = state.entities.filter(
                (employeeDetail) => employeeDetail.id !== id
            )
        }
        state.loading = false
    },
    [deleteEmployeeDetail.rejected]: (state, action) => {
        state.loading = false
    },
}
const employeeDetailSlice = createSlice({
    name: 'employeeDetail',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        employeeDetailAdded(state, action) {
            state.entities.push(action.payload)
        },
        employeeDetailUpdated(state, action) {
            const { id, name, empEmail } = action.payload
            const existingEmployeeDetail = state.entities.find(
                (employeeDetail) =>
                    employeeDetail.id.toString() === id.toString()
            )
            if (existingEmployeeDetail) {
                existingEmployeeDetail.name = name
                existingEmployeeDetail.empEmail = empEmail
            }
        },
        employeeDetailDeleted(state, action) {
            const { id } = action.payload
            const existingEmployeeDetail = state.entities.find(
                (employeeDetail) =>
                    employeeDetail.id.toString() === id.toString()
            )
            if (existingEmployeeDetail) {
                state.entities = state.entities.filter(
                    (employeeDetail) => employeeDetail.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchEmployeeDetailExtraReducer,
        ...addEmployeeDetailExtraReducer,
        ...editEmployeeDetailExtraReducer,
        ...deleteEmployeeDetailExtraReducer,
    },
})

export const {
    employeeDetailAdded,
    employeeDetailUpdated,
    employeeDetailDeleted,
} = employeeDetailSlice.actions

export default employeeDetailSlice.reducer
