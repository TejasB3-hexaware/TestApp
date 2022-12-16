import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const EmployeeDetailList = Loadable(lazy(() => import('./EmployeeDetailList')))
const EditEmployeeDetail = Loadable(lazy(() => import('./EditEmployeeDetail')))
const AddEmployeeDetail = Loadable(lazy(() => import('./AddEmployeeDetail')))

const employeeDetailRoutes = [
    {
        path: '/employeeDetail',
        element: <EmployeeDetailList />,
    },
    {
        path: '/employeeDetail/edit/:id',
        element: <EditEmployeeDetail />,
    },
    {
        path: '/employeeDetail/add',
        element: <AddEmployeeDetail />,
    },
]

export default employeeDetailRoutes
