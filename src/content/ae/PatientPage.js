// React
import React from 'react'

import { Box, Grid, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import useStorage from '../../api/useStorage'
import { useParams } from 'react-router-dom'
import OverviewTab from './tabs/OverviewTab'


function PatientPage(props) {

    const { dodid } = useParams()
    const [patients] = useStorage('patients', [])
    const patient = patients[dodid]


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
                            label="Vitals"
                        />
                        <Tab
                            label="Assessment"
                        />
                        <Tab
                            label="Notes"
                        />
                    </TabList>
                </Box>
                <TabPanel value={1}>
                    <OverviewTab />
                </TabPanel>
            </TabContext>
        </Grid>
    )
}

export default PatientPage