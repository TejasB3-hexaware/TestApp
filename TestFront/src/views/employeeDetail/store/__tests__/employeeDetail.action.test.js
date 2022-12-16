import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchEmployeeDetail,
    addEmployeeDetail,
    editEmployeeDetail,
    deleteEmployeeDetail,
} from '../employeeDetail.action'

const getEmployeeDetailListResponse = [
    {
        id: 1,
        name: 'name',
        empEmail: 'empEmail',
    },
]

const addEmployeeDetailListResponse = (data) => {
    return { id: 2, ...data }
}
const editEmployeeDetailListResponse = (data) => {
    return data
}

describe('should test EmployeeDetail redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'employeeDetail'
    test('Should be able to fetch the employeeDetail list and update employeeDetail redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getEmployeeDetailListResponse)
        const result = await store.dispatch(fetchEmployeeDetail())
        const employeeDetailList = result.payload
        expect(result.type).toBe('employeeDetail/fetchEmployeeDetail/fulfilled')
        expect(employeeDetailList).toEqual(getEmployeeDetailListResponse)

        const state = store.getState().employeeDetail
        expect(state.entities).toEqual(employeeDetailList)
    })

    test('Should be able to add new employeeDetail to list and make post api and update employeeDetail redux store', async () => {
        const body = {
            name: 'name',
            empEmail: 'empEmail',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addEmployeeDetailListResponse(body)
        )
        const result = await store.dispatch(addEmployeeDetail(body))
        const employeeDetailItem = result.payload
        expect(result.type).toBe('employeeDetail/addEmployeeDetail/fulfilled')
        expect(employeeDetailItem).toEqual(addEmployeeDetailListResponse(body))

        const state = store.getState().employeeDetail
        expect(state.entities).toContainEqual(
            addEmployeeDetailListResponse(body)
        )
    })

    test('Should be able to edit employeeDetail in list and make put api call and update employeeDetail redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            empEmail: 'empEmail',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editEmployeeDetailListResponse(body)
        )
        const result = await store.dispatch(editEmployeeDetail(body))
        const employeeDetailItem = result.payload
        expect(result.type).toBe('employeeDetail/editEmployeeDetail/fulfilled')
        expect(employeeDetailItem).toEqual(editEmployeeDetailListResponse(body))

        const state = store.getState().employeeDetail
        let changedEmployeeDetail = state.entities.find((p) => p.id === body.id)
        expect(changedEmployeeDetail.name).toEqual(body.name)
    })

    test('Should be able to delete employeeDetail in list and update employeeDetail redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().employeeDetail
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteEmployeeDetail(input))
        const deletId = result.payload
        expect(result.type).toBe(
            'employeeDetail/deleteEmployeeDetail/fulfilled'
        )
        expect(deletId).toEqual(input.id)

        state = store.getState().employeeDetail
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
