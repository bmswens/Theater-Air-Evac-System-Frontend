// React
import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

const blankEntry = {
    datetime: new Date(),
    hr: '',
    rr: '',
    temp: '',
    map: '',
    art: '',
    cvp: '',
    sao2: '',
    rythem: '',
    icp: ''
}

function EntryTable(props) {
    const columns = Object.keys(blankEntry).map(key => {
        return {
            field: key,
            headerName: key,
            flex: 1
        }
    })

    return (
        <Box sx={{ width: "100%", height: 400 }}>
            <DataGrid
                columns={columns}
                rows={[]}
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    )

}

function OverviewTab(props) {

    const { allergies } = props

    return (
        <Stack spacing={1}>
            <EntryTable />
            <TextField
                fullWidth
                label="Primary Diagonsis"
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
            />
        </Stack>
    )
}

export default OverviewTab