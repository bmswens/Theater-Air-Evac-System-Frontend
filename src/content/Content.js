// React
import React, { Suspense } from 'react'

// MUI
import { Grid, LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Patients from './Patients'
import PatientPage from './PatientPage'

function Content(props) {
    
    return (
        <Grid
            container
            spacing={1}
            sx={{
                paddingLeft: "7px",
                paddingRight: "7px",
                marginTop: "7px",
                alignContent: "stretch"
            }}
        >
            <Suspense fallback={<LinearProgress />}>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/patients"
                        element={<Patients />}
                    />
                    <Route
                        path="/patients/:dodid"
                        element={<PatientPage />}
                    />
                </Routes>
            </Suspense>
        </Grid>
    )
}

export default Content