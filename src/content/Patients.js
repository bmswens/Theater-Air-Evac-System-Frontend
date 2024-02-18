// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import InfoIcon from '@mui/icons-material/Info'
import FolderIcon from '@mui/icons-material/Folder'
import ForwardIcon from '@mui/icons-material/Forward'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

// React router
import { Link } from 'react-router-dom'

// use hooks
import { useLocalStorage } from 'usehooks-ts'
import api from '../api'
import NewPatientForm from '../forms/NewPatientForm'


function PatientCard(props) {

    const {
        firstName,
        lastName,
        dodid
    } = props


    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <CardHeader
                    avatar={<Avatar><FolderIcon /></Avatar>}
                    title={`${firstName} ${lastName}`}
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={`${dodid}`}
                />
                <CardActions>
                    <Tooltip
                        title="Show Information"
                    >
                        <IconButton>
                            <InfoIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip
                        title="Open Folder"
                    >
                        <Link to={`/patients/${dodid}`}>
                            <IconButton>
                                <ForwardIcon fontSize="large" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    )
}

function AddNewCard(props) {
    const { onClick } = props

    return (
        <Grid item xs={12} md={6} lg={3}>
            <CardActionArea
                onClick={onClick}
                sx={{ height: "100%"}}
            >
                <Card sx={{ height: "100%" }}>
                    <CardHeader
                        title="Add New Patient"
                        titleTypographyProps={{ variant: "h6" }}
                        avatar={<Avatar><PersonAddIcon /></Avatar>}
                    />
                    <CardContent>
                        <Box sx={{ flexGrow: 1 }} />
                    </CardContent>
                    <CardActions />
                </Card>
            </CardActionArea>
        </Grid>
    )
}

function Patients(props) {

    const [patients] = useLocalStorage('patients', api.initialPatients)
    const [open, setOpen] = React.useState(false)

    return (
        <>
            {Object.keys(patients).map(id => <PatientCard key={patients[id].dodid} {...patients[id]} />)}
            <AddNewCard onClick={() => setOpen(true)} />
            <NewPatientForm
                open={open}
                close={() => setOpen(false)}
            />
        </>
    )

}

export default Patients