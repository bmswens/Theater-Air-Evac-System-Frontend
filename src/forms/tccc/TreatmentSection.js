// React
import React from 'react'

// MUI
import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function CirculationResGrid(props) {
    const { rows } = props
    const columns = [
        {
            field: "datetime",
            headerName: "Datetime",
            description: "Datetime of entry.",
            flex: 1
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: "volume",
            headerName: "Volume",
            flex: .33
        },
        {
            field: "route",
            headerName: "Route",
            flex: .66
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
            />
        </Box>
    )
}

function MedicationGrid(props) {
    const { rows } = props
    const columns = [
        {
            field: "datetime",
            headerName: "Datetime",
            description: "Datetime of entry.",
            flex: 1
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: "dose",
            headerName: "Dose",
            flex: .33
        },
        {
            field: "route",
            headerName: "Route",
            flex: .66
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
            />
        </Box>
    )
}

function TreatmentSection(props) {

    const {
        circulation,
        airway,
        breathing,
        circulationRes,
        medication,
        other
    } = props


    return (
        <>
            <Typography variant="h6" align="center">
                Treatments
            </Typography>
            <FormLabel id="circulation-control" align="center">Circulation Control</FormLabel>
            <FormGroup row sx={{justifyContent: "center"}}>
                <FormControlLabel control={<Checkbox disabled checked={circulation.tqExtremity}/>} label="TQ-Extremity" />
                <FormControlLabel control={<Checkbox disabled checked={circulation.tqJunctional} />} label="TQ-Junctional" />
                <FormControlLabel control={<Checkbox disabled checked={circulation.tqTruncal} />} label="TQ-Truncal" />
            </FormGroup>
            <FormGroup row sx={{justifyContent: "center"}}>
                <FormControlLabel control={<Checkbox disabled checked={circulation.dressHemo}/>} label="Dressing-Hemostatic" />
                <FormControlLabel control={<Checkbox disabled checked={circulation.dressPressure} />} label="Dressing-Pressure" />
                <FormControlLabel control={<Checkbox disabled checked={circulation.dressOther} />} label="Dressing-Other" />
            </FormGroup>
            <FormLabel id="airway-control" align="center">Airway</FormLabel>
            <FormGroup row sx={{justifyContent: "center"}}>
                <FormControlLabel control={<Checkbox disabled checked={airway.intact}/>} label="Intact" />
                <FormControlLabel control={<Checkbox disabled checked={airway.npa} />} label="NPA" />
                <FormControlLabel control={<Checkbox disabled checked={airway.cric} />} label="CRIC" />
                <FormControlLabel control={<Checkbox disabled checked={airway.etTube} />} label="ET-Tube" />
                <FormControlLabel control={<Checkbox disabled checked={airway.sga} />} label="SGA" />
            </FormGroup>
            <FormLabel id="breathing-control" align="center">Breathing</FormLabel>
            <FormGroup row sx={{justifyContent: "center"}}>
                <FormControlLabel control={<Checkbox disabled checked={breathing.o2}/>} label="O2" />
                <FormControlLabel control={<Checkbox disabled checked={breathing.needle} />} label="Needle-D" />
                <FormControlLabel control={<Checkbox disabled checked={breathing.chestTube} />} label="Chest-Tube" />
                <FormControlLabel control={<Checkbox disabled checked={breathing.chestSeal} />} label="Chest-Seal" />
            </FormGroup>
            <CirculationResGrid
                rows={circulationRes}
            />
            <MedicationGrid
                rows={medication}
            />
            <FormLabel id="other-control" align="center">Other</FormLabel>
            <FormGroup row sx={{justifyContent: "center"}}>
                <FormControlLabel control={<Checkbox disabled checked={other.pill}/>} label="Combat-Pill-Pack" />
                <FormControlLabel control={<Checkbox disabled checked={other.eyeLeft} />} label="Eye-Shield-Left" />
                <FormControlLabel control={<Checkbox disabled checked={other.eyeRight} />} label="Eye-Shield-Right" />
                <FormControlLabel control={<Checkbox disabled checked={other.splint} />} label="Splint" />
                <FormControlLabel control={<Checkbox disabled checked={other.hypothermia} />} label="Hypothermia-Prevention" />
            </FormGroup>
        </>
    )
}

export default TreatmentSection