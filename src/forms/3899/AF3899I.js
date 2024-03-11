// React
import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const blankEntry = {
    datetime: new Date(),
    medication: '',
    dose: '',
    route:'',
    initials1: '',
    initials2: ''
}

function EntryTable(props) {
    const { rows } = props
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
            field: "dose",
            headerName: "Dosage",
            flex: 1
        },
        {
            field: "route",
            headerName: "Route",
            flex: 1
        },
        {
            field: "initials1",
            headerName: "Initials",
            flex: 1
        },
        {
            field: "initials2",
            headerName: "Initials",
            flex: 1
        },
    ]

    const finalRows = rows.map((row, index) => { return { ...row, id: index } })

    return (
        <Box sx={{ width: "100%", height: 400 }}>
            <DataGrid
                columns={columns}
                rows={finalRows}
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    )

}

function AF3899I(props) {

    const {
        open,
        close,
        entries,
        addEntry
    } = props
    console.log(props)
    const [data, setData] = React.useState(blankEntry)

    function handleClose() {
        setData(blankEntry)
        close()
    }

    function submit() {
        addEntry(data)
        setData(blankEntry)
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                AF Form 3899I
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <EntryTable
                        rows={entries}
                    />
                    <Divider>
                        New Entry
                    </Divider>
                    <Stack spacing={1} direction="row">
                        <TextField
                            fullWidth
                            label="Medication"
                            value={data.medication}
                            onChange={event => setData({ ...data, medication: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Dosage"
                            value={data.dose}
                            onChange={event => setData({ ...data, dose: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Route"
                            value={data.route}
                            onChange={event => setData({ ...data, route: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Initials"
                            value={data.initials1}
                            onChange={event => setData({ ...data, initials1: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Initials"
                            value={data.initials2}
                            onChange={event => setData({ ...data, initials2: event.target.value })}
                        />
                    </Stack>
                    <Stack spacing={1} direction="row-reverse">
                        <Button
                            variant="contained"
                            onClick={submit}
                            disabled={data.initials1.length === 0 || data.initials2.length === 0}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AF3899I