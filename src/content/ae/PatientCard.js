// React
import React from 'react'

// MUI
import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import FolderIcon from '@mui/icons-material/Folder'


import useStorage from '../../api/useStorage'
import TCCC from '../../forms/tccc/TCCC'
import { useNavigate } from 'react-router-dom'
import AF3899D from '../../forms/3899/AF3899D'

function PatientCard(props) {
    const {
        firstName,
        lastName,
        dodid
    } = props

    const [docs, setDocs] = useStorage(`${dodid}-documents`, [])
    const navigate = useNavigate()
    
    let tccc = null
    let af3899 = null
    let af3899Index = null
    for (let index in docs) {
        let doc = docs[index]
        if (doc.name === "Tactical Casualty Care Card") {
            tccc = doc
        }
        if (doc.name === "AF Form 3899") {
            af3899 = doc
            af3899Index = index
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
    
    return (
        <Grid item xs={12}>
            <Card>
                <CardActionArea
                    aria-label={`Open ${dodid}`}
                    onClick={() => navigate(`/patients/${dodid}`)}
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
                            disabled={af3899 === null}
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
            {
                af3899 ?
                    <AF3899D
                        open={vitalsOpen}
                        close={close}
                        entries={af3899.af3899d || []}
                    />
                    : 
                    null
            }
        </Grid>
    )
}

export default PatientCard