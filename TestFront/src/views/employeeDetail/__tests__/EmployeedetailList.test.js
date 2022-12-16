const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EmployeeDetailList from '../EmployeeDetailList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render EmployeeDetail rows when api response has data', async () => {
    const endPoint = 'employeeDetail'
    const getEmployeeDetailListResponse = [
        {
            id: 1,
            name: 'name1',
            empEmail: 'empEmail1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getEmployeeDetailListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <EmployeeDetailList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const employeeDetailNameCell = await screen.findByText(/name1/i)

    expect(employeeDetailNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
