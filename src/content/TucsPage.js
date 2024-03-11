// React
import { Box, Button, Card, CardActions, CardContent, Grid, Stack, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

const blankEntry = {
    lastName: '',
    firstName: '',
    patientId: '',
    idType: '',
    gender: '',
    patientHistory: '',
    pmrRemarks: '',
    ccatt: '',
    spaceType: '',
    precedence: '',
    inpatientBedType: '',
    attendantsNum: '',
    attendantsNames: '',
    transportOrigin: '',
    age: '',
    ageUnit: ''
}

const blankQuickEntry = {
    lastName: '',
    firstName: '',
    patientId: '',
    gender: '',
    precedence: ''
}

function QuickEntryCard(props) {

    const { addEntry } = props

    const [data, setData] = React.useState(blankQuickEntry)

    function submit() {
        addEntry(data)
        setData(blankQuickEntry)
    }

    return (
        <Card>
            <CardContent>
                <Stack spacing={1} direction="row">
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={data.lastName}
                        onChange={event => setData({ ...data, lastName: event.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        value={data.firstName}
                        onChange={event => setData({ ...data, firstName: event.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Patient ID"
                        value={data.patientId}
                        onChange={event => setData({ ...data, patientId: event.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Gender"
                        value={data.gender}
                        onChange={event => setData({ ...data, gender: event.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Precedence"
                        value={data.precedence}
                        onChange={event => setData({ ...data, precedence: event.target.value })}
                    />
                </Stack>
            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant='contained'
                    onClick={submit}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    )
}

function TucsTable(props) {

    const [tucs, setTucs] = useLocalStorage('tucs', [])
    const finalRows = tucs.map((row, index) => { return { ...row, id: index } })
    const columns = [
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            editable: true
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            editable: true
        },
        {
            field: "patientId",
            headerName: "Patient ID",
            flex: 1,
            editable: true
        },
        {
            field: "idType",
            headerName: "ID Type",
            flex: 1,
            editable: true
        },
        {
            field: "gender",
            headerName: "Gender",
            flex: 1,
            editable: true
        },
        {
            field: "patientHistory",
            headerName: "Patient History",
            flex: 1,
            editable: true
        },
        {
            field: "pmrRemarks",
            headerName: "PMR Remarks",
            flex: 1,
            editable: true
        },
        {
            field: "ccatt",
            headerName: "CCATT",
            flex: 1,
            editable: true
        },
        {
            field: "spaceType",
            headerName: "Space Type",
            flex: 1,
            editable: true
        },
        {
            field: "precedence",
            headerName: "Precedence",
            flex: 1,
            editable: true
        },
        {
            field: "inpatientBedType",
            headerName: "Inpatient Bed Type",
            flex: 1,
            editable: true
        },
        {
            field: "attendantsNum",
            headerName: "# of Attendants",
            flex: 1,
            editable: true
        },
        {
            field: "attendantsNames",
            headerName: "Attendant Names",
            flex: 1,
            editable: true
        },
        {
            field: "transportOrigin",
            headerName: "Transport Origin",
            flex: 1,
            editable: true
        },
        {
            field: "age",
            headerName: "Age",
            flex: 1,
            editable: true
        },
        {
            field: "ageUnit",
            headerName: "Age Unit",
            flex: 1,
            editable: true
        }
    ]

    function onUpdate(newRow, oldRow) {
        let tmpTucs = [...tucs]
        tmpTucs.splice(oldRow.id, 1, newRow)
        setTucs(tmpTucs)
        return newRow
    }

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 230px)" }}>
            <DataGrid
                rows={finalRows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                processRowUpdate={onUpdate}
            />
        </Box>
    )
}

function TucsPage(props) {

    const [tucs, setTucs] = useLocalStorage('tucs', [])

    function addEntry(data) {
        const entry = { ...blankEntry, ...data }
        setTucs([...tucs, entry])
    }

    return (
        <>
            <Grid item xs={12}>
                <QuickEntryCard
                    addEntry={addEntry}
                />
            </Grid>
            <Grid item xs={12}>
                <TucsTable

                />
            </Grid>
        </>
    )

}

export default TucsPage