const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddEmployeeDetail from '../AddEmployeeDetail'

beforeEach(() => {
    const endPoint = 'employeeDetail'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            empEmail: 'empEmail',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddEmployeeDetail />
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

describe('testing view EmployeeDetailAdd Component', () => {
    test('should render AddEmployeeDetail and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addEmployeeDetailButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const empEmailElement = screen.getByLabelText(/EmpEmail/i)

        expect(addEmployeeDetailButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(empEmailElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of EmployeeDetail add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const empEmailElement = screen.getByLabelText(/EmpEmail/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(empEmailElement, { target: { value: 'empEmail' } })
    })

    test('should return error message when add EmployeeDetail button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addEmployeeDetailButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addEmployeeDetailButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
