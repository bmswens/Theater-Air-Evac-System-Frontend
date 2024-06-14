// React
import React from 'react'

// MUI
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material'

// custom
import data from '../../../data'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const blankEntry = {
    datetime: new Date(),
    medication: '',
    route: '',
    firstInitials: '',
    secondInitials: ''
}

function NewMedCard(props) {

    const {addEntry} = props
    
    // state
    const [entry, setEntry] = React.useState(blankEntry)

    function submit() {
        addEntry(entry)
        setEntry({...blankEntry, datetime: new Date()})
    }

    return (
        <Card>
            <CardHeader
                title="New Medication"
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Autocomplete
                            fullWidth
                            value={entry.medication}
                            onChange={(event, newValue) => setEntry({...entry, medication: newValue})}
                            renderInput={params => <TextField {...params} label="Medication" />}
                            options={data.meds}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Route"
                            value={entry.route}
                            onChange={event => setEntry({...entry, route: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Initials"
                            value={entry.firstInitials}
                            onChange={event => setEntry({...entry, firstInitials: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Initials"
                            value={entry.secondInitials}
                            onChange={event => setEntry({...entry, secondInitials: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row-reverse">
                            <Button
                                variant='contained'
                                disabled={entry.firstInitials.length === 0 || entry.medication.length === 0}
                                onClick={submit}
                                size="large"
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

function MedsTable(props) {
    const {meds} = props
    const columns = [
        {
            field: "datetime",
            headerName: "Datetime",
            flex: 1
        },
        {
            field: "medication",
            headerName: "Medication",
            flex: 1
        },
        {
            field: "route",
            headerName: "Route",
            flex: .66
        },
        {
            field: "firstInitials",
            headerName: "Initials",
            flex: .5
        },
        {
            field: "secondInitials",
            headerName: "Initials",
            flex: .5
        },
    ]

    return (
        <Box
            sx={{
                width: "100%",
                height: 400
            }}
        >
            <DataGrid
                columns={columns}
                rows={meds.map((row, index) => { return {...row, id: index}})}
                slots={{ toolbar: GridToolbar}}
            />
        </Box>
    )
}

function MedsTab(props) {

    const { meds, updatePatient} = props

    function addEntry(med) {
        updatePatient("meds", [...meds, med])
    }

    return (
        <Stack spacing={1}>
            <NewMedCard
                addEntry={addEntry}
            />
            <MedsTable
                meds={meds}
            />
        </Stack>
    )

}

export default MedsTab