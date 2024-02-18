// React
import React from 'react'

// MUI
import { Autocomplete, Avatar, Box, Card, CardActions, CardContent, CardHeader, Grid, IconButton, LinearProgress, TextField, Tooltip, Typography } from '@mui/material'

// MUI icons
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete';

// router
import { useNavigate, useParams } from 'react-router-dom'

// custom
import api from '../api'
import { useLocalStorage } from 'usehooks-ts'
import SelectFormDialog from '../components/SelectFormDialogs'
import BlankTCCC from '../forms/blankTccc/BlankTCCC'
import TCCCCard from './documentCards/TCCCCard'
import ThirtyEightNintyNineForm from '../forms/3899/ThirtyEightNinetyNineForm'
import NineLineForm from '../forms/9line/NineLineForm'
import NineLineCard from './documentCards/NineLineCard'

function PatientActions(props) {

    const { patient, remove } = props

    const [open, setOpen] = React.useState()
    const [form, setForm] = React.useState([])

    function close() {
        setOpen(false)
    }

    return (
        <>
            <CardActions>
                <Tooltip
                    title="Delete"
                >
                    <IconButton
                        onClick={remove}
                    >
                        <DeleteIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip
                    title="Download Data"
                >
                    <IconButton>
                        <DownloadIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title="Create New Document"
                >
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <NoteAddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <SelectFormDialog
                open={open}
                close={close}
                setForm={setForm}
            />
            <BlankTCCC
                open={form === "Tactical Casualty Care Card"}
                close={() => setForm([])}
                patient={patient}
            />
            <ThirtyEightNintyNineForm
                open={form === "AF Form 3899"}
                close={() => setForm([])}
                patient={patient}
            />
            <NineLineForm
                open={form === "9 Line"}
                close={() => setForm([])}
                dodid={patient.dodid}
            />
        </>
    )
}

function PatientData(props) {

    return (
        <Grid item xs={6}>
            <Typography>
                {props.children}
            </Typography>
        </Grid>
    )
}

function PatientInfo(props) {

    const {
        firstName,
        lastName,
        dodid,
        dob,
        bloodType,
        allergies, remove
    } = props

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title={`${firstName} ${lastName}`}
                    subheader={`${dodid}`}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <PatientData>
                            Date of Birth: {dob}
                        </PatientData>
                        <PatientData>
                            Blood Type: {bloodType}
                        </PatientData>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                fullWidth
                                disabled
                                renderInput={(params) => <TextField {...params} label="Allergies" />}
                                options={[]}
                                value={allergies}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <PatientActions patient={{ ...props }} remove={remove} />
            </Card>
        </Grid>
    )
}

function DocumentCard(props) {
    const {
        name,
        lastModified
    } = props

    // form selection

    if (name === "Tactical Casualty Care Card") {
        return <TCCCCard {...props} />
    }
    else if (name === "9 Line") {
        return <NineLineCard {...props} />
    }

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <CardHeader
                    avatar={<Avatar><DescriptionIcon fontSize="large" /></Avatar>}
                    title={name}
                    subheader={`${lastModified}`}
                />
                <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip
                        title="View Document"
                    >
                        <IconButton

                        >
                            <FileOpenIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    )
}

function PatientPage(props) {

    const { dodid } = useParams()
    const [patients, setPatients] = useLocalStorage('patients', api.initialPatients)
    const patient = patients[dodid]
    const fallback = dodid === "0000001" ? api.georgeDocs : []
    const [docs] = useLocalStorage(`${patient.dodid}-documents`, fallback)
    let navigate = useNavigate()

    if (!patient) {
        return (<LinearProgress />)
    }

    function remove() {
        let tmpPatients = { ...patients }
        delete tmpPatients[dodid]
        setPatients(tmpPatients)
        navigate("/patients")
    }

    return (
        <>
            <PatientInfo {...patient} remove={remove} />
            {docs.map((doc, index) => <DocumentCard key={doc.lastModifed} {...doc} index={index} dodid={dodid} />)}
        </>
    )
}

export default PatientPage