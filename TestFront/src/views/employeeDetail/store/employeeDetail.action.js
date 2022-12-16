import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'employeeDetail'

export const fetchEmployeeDetail = createAsyncThunk(
    'employeeDetail/fetchEmployeeDetail',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const employeeDetail = await response.data
        return employeeDetail
    }
)

export const addEmployeeDetail = createAsyncThunk(
    'employeeDetail/addEmployeeDetail',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const employeeDetail = await response.data
        thunkAPI.dispatch(showSuccess('EmployeeDetail added successfully'))
        return employeeDetail
    }
)

export const editEmployeeDetail = createAsyncThunk(
    'employeeDetail/editEmployeeDetail',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const employeeDetail = await response.data
        thunkAPI.dispatch(showSuccess('EmployeeDetail updated successfully'))
        return employeeDetail
    }
)

export const deleteEmployeeDetail = createAsyncThunk(
    'employeeDetail/deleteEmployeeDetail',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected employeeDetail deleted successfully.')
            )
            return data.id
        }
    }
)
