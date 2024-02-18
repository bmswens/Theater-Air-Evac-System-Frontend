// React
import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

// MUI

function SignsAndSymptoms(props) {
    const { rows } = props
    const columns = [
        {
            field: "datetime",
            headerName: "Datetime",
            description: "Datetime of entry.",
            flex: 1
        },
        {
            field: "pulse",
            headerName: "Pulse",
            description: "Rate and location.",
            flex: .66
        },
        {
            field: "bloodPressure",
            headerName: "Blood Pressure",
            description: "",
            flex: .66
        },
        {
            field: "respiratoryRate",
            headerName: "Respiratory Rate",
            description: "",
            flex: .66
        },
        {
            field: "oxygenSat",
            headerName: "O2 Saturation",
            description: "Pulse oxygen percent oxygen saturation.",
            flex: .66
        },
        {
            field: "avpu",
            headerName: "AVPU",
            description: "",
            flex: .5
        },
        {
            field: "pain",
            headerName: "Pain",
            description: "Pain on a 1-10 scale.",
            flex: .5
        }
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
                rows={rows}
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    )
}

export default SignsAndSymptoms