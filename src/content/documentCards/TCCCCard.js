// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DeleteIcon from '@mui/icons-material/Delete';

// custom
import TCCC from '../../forms/tccc/TCCC'
import AddVitalsForm from '../../forms/tccc/AddVitalsForm';
import AddCirculationForm from '../../forms/tccc/AddCirculationForm';
import AddMedForm from '../../forms/tccc/AddMedForm';
import useStorage from '../../api/useStorage';

function TCCCCard(props) {
    const {
        lastModifed,
        data,
        dodid,
        index
    } = props

    const [open, setOpen] = React.useState(false)
    const [vitalOpen, setVitalOpen] = React.useState(false)
    const [circulationOpen, setCirculationOpen] = React.useState(false)
    const [medicationOpen, setMedicationOpen] = React.useState(false)
    const [docs, setDocs] = useStorage(`${dodid}-documents`, [])
    const doc = docs[index]
    
    function addVitals(data) {
        let tempDocs = [...docs]   
        let tempDoc = {
            ...doc,
            data: {
                ...doc.data,
                signsAndSymptoms: [
                    ...doc.data.signsAndSymptoms,
                    {
                        ...data,
                        id: doc.data.signsAndSymptoms.length
                    }
                ]
            }
        }
        tempDocs.splice(index, 1, tempDoc)
        setDocs(tempDocs)
    }

    function addCirculation(data) {
        let tempDocs = [...docs]   
        let tempDoc = {
            ...doc,
            data: {
                ...doc.data,
                circulationRes: [
                    ...doc.data.circulationRes,
                    {
                        ...data,
                        id: doc.data.circulationRes.length
                    }
                ]
            }
        }
        tempDocs.splice(index, 1, tempDoc)
        setDocs(tempDocs)
    }

    function addMedication(data) {
        let tempDocs = [...docs]   
        let tempDoc = {
            ...doc,
            data: {
                ...doc.data,
                medication: [
                    ...doc.data.medication,
                    {
                        ...data,
                        id: doc.data.medication.length
                    }
                ]
            }
        }
        tempDocs.splice(index, 1, tempDoc)
        setDocs(tempDocs)
    }

    function remove() {
        let tempDocs = [...docs]
        tempDocs.splice(index, 1)
        setDocs(tempDocs)
    }

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardHeader
                    avatar={<Avatar><DescriptionIcon fontSize="large" /></Avatar>}
                    title="Tactical Casualty Care Card"
                    subheader={lastModifed}
                />
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
                    <Box sx={{flexGrow: 1}} />
                    <Tooltip
                        title="Add Vitals Entry"
                    >
                        <IconButton
                            onClick={() => setVitalOpen(true)}
                        >
                            <MonitorHeartIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Add Cardiopulmonary Entry"
                    >
                        <IconButton
                            onClick={() => setCirculationOpen(true)}
                        >
                            <BloodtypeIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Add Medication Entry"
                    >
                        <IconButton
                            onClick={() => setMedicationOpen(true)}
                        >
                            <VaccinesIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="View Document"
                    >
                        <IconButton
                            onClick={() => setOpen(true)}
                        >
                            <FileOpenIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <AddVitalsForm
                open={vitalOpen}
                close={() => setVitalOpen(false)}
                addVitals={addVitals}
            />
            <AddCirculationForm
                open={circulationOpen}
                close={() => setCirculationOpen(false)}
                addCirculation={addCirculation}
            />
            <AddMedForm
                open={medicationOpen}
                close={() => setMedicationOpen(false)}
                addMedication={addMedication}
            />
            <TCCC
                open={open}
                close={() => setOpen(false)}
                data={data}
            />
        </Grid>
    )
}

export default TCCCCard