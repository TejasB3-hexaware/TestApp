import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editEmployeeDetail } from './store/employeeDetail.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditEmployeeDetail = () => {
    const { id: employeeDetailId } = useParams()

    const employeeDetail = useSelector((state) =>
        state.employeeDetail.entities.find(
            (employeeDetail) =>
                employeeDetail.id.toString() === employeeDetailId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(employeeDetail.name)
    const [empEmail, setEmpEmail] = useState(employeeDetail.empEmail)

    const handleName = (e) => setName(e.target.value)
    const handleEmpEmail = (e) => setEmpEmail(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editEmployeeDetail({
                id: employeeDetailId,
                name,
                empEmail,
            })
        )
        navigate('/employeeDetail')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditEmployeeDetail', path: '/employeeDetail' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="empEmail"
                                id="empEmailInput"
                                onChange={handleEmpEmail}
                                value={empEmail}
                                validators={['required']}
                                label="EmpEmail"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditEmployeeDetail
