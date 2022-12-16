const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditEmployeeDetail from '../EditEmployeeDetail'
import { employeeDetailAdded } from '../store/employeeDetailSlice'
beforeAll(() => {
    store.dispatch(
        employeeDetailAdded({
            id: 1,
            name: 'name',
            empEmail: 'empEmail',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate
                                        to="employeeDetail/edit/1"
                                        replace
                                    />
                                }
                            />
                            <Route
                                path="employeeDetail/edit/:id"
                                element={<EditEmployeeDetail />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of EmployeeDetailEdit Component', () => {
    test('should render EditEmployeeDetail and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveEmployeeDetailButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const empEmailElement = screen.getByLabelText(/EmpEmail/i)

        expect(saveEmployeeDetailButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(empEmailElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of EmployeeDetail edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const empEmailElement = screen.getByLabelText(/EmpEmail/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(empEmailElement, { target: { value: 'empEmail' } })

        expect(nameElement.value).toBe('name')

        expect(empEmailElement.value).toBe('empEmail')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const empEmailElement = screen.getByLabelText(/EmpEmail/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(empEmailElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveEmployeeDetailButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveEmployeeDetailButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
