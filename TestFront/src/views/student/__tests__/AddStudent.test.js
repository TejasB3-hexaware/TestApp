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
import AddStudent from '../AddStudent'

beforeEach(() => {
    const endPoint = 'student'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            email: 'email',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStudent />
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

describe('testing view StudentAdd Component', () => {
    test('should render AddStudent and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)

        expect(addStudentButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(emailElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(emailElement, { target: { value: 'email' } })
    })

    test('should return error message when add Student button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStudentButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
