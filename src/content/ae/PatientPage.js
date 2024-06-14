// React
import React from 'react'

import { Box, Grid, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import useStorage from '../../api/useStorage'
import { useParams } from 'react-router-dom'
import OverviewTab from './tabs/OverviewTab'
import OrdersTab from './tabs/OrdersTab'


function PatientPage(props) {

    const { dodid } = useParams()
    const [patients, setPatients] = useStorage('patients', {})
    const patient = patients[dodid]

    function updatePatient(key, value) {
        let newPatient = {
            ...patient,
            [key]: value
        }
        setPatients({
            ...patients,
            [dodid]: newPatient
        })
    }


    const [tab, setTab] = React.useState(1)

    function handleTab(event, newValue) {
        setTab(newValue)
    }

    return (
        <Grid item xs={12}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTab}>
                        <Tab
                            label={
                                <>
                                    <Typography>
                                        {patient.firstName} {patient.lastName}
                                    </Typography>
                                    <Typography >
                                        {patient.dodid}
                                    </Typography>
                                </>
                            }
                            disabled
                        />
                        <Tab
                            label="Overview"
                        />
                        <Tab
                            label="Demo"
                        />
                        <Tab
                            label="Orders"
                        />
                        <Tab
                            label="MEDS"
                        />
                        <Tab
                            label="Assessment"
                        />
                    </TabList>
                </Box>
                <TabPanel value={1}>
                    <OverviewTab
                        diagnosis={patient.diagnosis || ""}
                        notes={patient.notes || ""}
                        vitals={patient.vitals || []}
                        updatePatient={updatePatient}
                    />
                </TabPanel>
                <TabPanel value={3}>
                    <OrdersTab
                        orders={patient.orders || []}
                        updatePatient={updatePatient}
                    />
                </TabPanel>
            </TabContext>
        </Grid>
    )
}

export default PatientPage