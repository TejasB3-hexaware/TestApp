import store from 'store/store'
import {
    employeeDetailAdded,
    employeeDetailDeleted,
    employeeDetailUpdated,
} from '../employeeDetailSlice'

describe('testing employeeDetail redux store reducers', () => {
    test('add employeeDetail to store test', () => {
        let state = store.getState().employeeDetail
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            empEmail: 'empEmail',
        }
        store.dispatch(employeeDetailAdded(initialInput))
        state = store.getState().employeeDetail
        expect(state.entities).toHaveLength(1)
    })

    test('update employeeDetail from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            empEmail: 'empEmail',
        }
        store.dispatch(employeeDetailAdded(initialInput))
        let state = store.getState().employeeDetail
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            empEmail: 'empEmail1',
        }
        store.dispatch(employeeDetailUpdated(updatedInput))
        state = store.getState().employeeDetail
        let changedEmployeeDetail = state.entities.find((p) => p.id === 2)
        expect(changedEmployeeDetail).toStrictEqual(updatedInput)
    })

    test('delete employeeDetail from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            empEmail: 'empEmail',
        }
        store.dispatch(employeeDetailAdded(initialInput))
        let state = store.getState().employeeDetail
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            employeeDetailDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().employeeDetail
        expect(state.entities).toHaveLength(2)
    })
})
