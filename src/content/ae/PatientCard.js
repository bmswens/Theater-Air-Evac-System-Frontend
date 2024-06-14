// React
import React from 'react'

// MUI
import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import FolderIcon from '@mui/icons-material/Folder'


import useStorage from '../../api/useStorage'
import TCCC from '../../forms/tccc/TCCC'
import { useNavigate } from 'react-router-dom'
import VitalsForm from '../../forms/ae/VitalsForm'

function PatientCard(props) {
    const {
        firstName,
        lastName,
        dodid
    } = props

    const [patients, setPatients] = useStorage('patients', {})
    const patient = patients[dodid]

    const [docs] = useStorage(`${dodid}-documents`, [])
    const navigate = useNavigate()
    
    let tccc = null
    for (let index in docs) {
        let doc = docs[index]
        if (doc.name === "Tactical Casualty Care Card") {
            tccc = doc
        }
    }

    const [tcccOpen, setTccOpen] = React.useState(false)
    const [vitalsOpen, setVitalsOpen] = React.useState(false)

    function close() {
        setTccOpen(false)
        setVitalsOpen(false)
    }

    // function addDeltaEntry(entry) {
    //     let tempDoc = {...af3899, af3899d: af3899.af3899d || []}
    //     tempDoc.af3899d = [...tempDoc.af3899d, entry]
    //     let tempDocs = [...docs]
    //     tempDocs.splice(af3899Index, 1, tempDoc)
    //     setDocs(tempDocs)
    // }



    function updatePatient(key, value) {
        let newPatient = {
            ...patient,
            [key]: value
        }
        setPatients({
            ...patients,
            [dodid]: newPatient
        })
    }

    function addEntry(data) {
        updatePatient("vitals", [...patient.vitals || [], data])
    }
    
    return (
        <Grid item xs={12}>
            <Card>
                <CardActionArea
                    aria-label={`Open ${dodid}`}
                    onClick={() => navigate(`/patients/ae/${dodid}`)}
                >
                    <CardHeader
                        title={`${firstName} ${lastName}`}
                        titleTypographyProps={{ variant: "h6" }}
                        subheader={dodid}
                        avatar={<Avatar><FolderIcon /></Avatar>}
                    />
                </CardActionArea>
                <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            onClick={() => setTccOpen(true)}
                            disabled={tccc === null}
                        >
                            TCCC
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setVitalsOpen(true)}
                        >
                            Vitals
                        </Button>
                        <Button
                            variant="contained"
                            disabled
                        >
                            ISBAR
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
            {
                tccc ?
                    <TCCC
                        open={tcccOpen}
                        close={close}
                        data={tccc.data}
                    />
                    :
                    null
            }
            <VitalsForm
                open={vitalsOpen}
                close={close}
                addEntry={addEntry}
            />
        </Grid>
    )
}

export default PatientCard