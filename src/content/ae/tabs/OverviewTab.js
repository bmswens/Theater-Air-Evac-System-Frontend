// React
import { Autocomplete, Box, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Graph from '../../../components/Graph'



function VitalCard(props) {
    const { title, content } = props

    return (
        <Card>
            <CardHeader
                title={title}
            />
            <CardContent>
                <Typography variant="h2" align="center">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )
}

function VitalsGraphs(props) {

    const { vitals } = props
    const times = vitals.map(entry => entry.datetime)

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Graph
                    title="Pulse"
                    x={times}
                    y={vitals.map(entry => entry.pulse)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Graph
                    title="MAP"
                    x={times}
                    y={vitals.map(entry => entry.map)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Graph
                    title="RR"
                    x={times}
                    y={vitals.map(entry => entry.rr)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Graph
                    title="Oxygen"
                    x={times}
                    y={vitals.map(entry => entry.spo2)}
                />
            </Grid>
        </Grid>
    )
}

function OverviewTab(props) {

    const { allergies, diagnosis, updatePatient, notes } = props
    let { vitals } = props
    vitals = vitals || []

    const latestEntry = vitals[vitals.length - 1] || {}
    const vitalsToDisplay = [
        {
            title: "Pulse",
            content: latestEntry.pulse || ""
        },
        {
            title: "Blood Pressure & MAP",
            content: latestEntry.bloodPressure ? `${latestEntry.bloodPressure} (${latestEntry.map})` : ''
        },
        {
            title: "CO2",
            content: latestEntry.co2 || ""
        },
        {
            title: "SPO2",
            content: latestEntry.spo2 || ""
        },
        {
            title: "Pain",
            content: latestEntry.pain || ""
        }
    ]

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
                {vitalsToDisplay.map((vital, index) => <Box key={index} sx={{ flexGrow: 1 }}><VitalCard {...vital} /></Box>)}
            </Stack>
            <TextField
                fullWidth
                label="Primary Diagonsis"
                value={diagnosis}
                onChange={event => updatePatient("diagnosis", event.target.value)}
            />
            <Autocomplete
                multiple
                freeSolo
                fullWidth
                disabled
                renderInput={(params) => <TextField {...params} label="Allergies" />}
                options={[]}
                value={allergies}
            />
            <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={notes}
                onChange={event => updatePatient("notes", event.target.value)}
            />
            <VitalsGraphs
                vitals={vitals}
            />
        </Stack>
    )
}

export default OverviewTab