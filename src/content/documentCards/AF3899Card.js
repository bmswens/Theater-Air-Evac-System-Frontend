// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import VaccinesIcon from '@mui/icons-material/Vaccines';

// custom
import ThirtyEightNintyNineForm from '../../forms/3899/ThirtyEightNinetyNineForm';
import AF3899A from '../../forms/3899/AF3899A';
import useStorage from '../../api/useStorage';
import AF3899D from '../../forms/3899/AF3899D';

function AF3899Card(props) {
    const {
        lastModified,
        dodid,
        index
    } = props

    const [open, setOpen] = React.useState(false)
    const [alphaOpen, setAlphaOpen] = React.useState(false)
    const [deltaOpen, setDeltaOpen] = React.useState(false)
    const [docs, setDocs] = useStorage(`${dodid}-documents`, [])
    const [patients] = useStorage("patients", [])
    const doc = docs[index]
    let patient = patients[dodid]
    
    function remove() {
        let tempDocs = [...docs]
        tempDocs.splice(index, 1)
        setDocs(tempDocs)
    }

    function addAlphaEntry(entry) {
        let tempDoc = {...doc, af3899a: doc.af3899a || []}
        tempDoc.af3899a = [...tempDoc.af3899a, entry]
        let tempDocs = [...docs]
        tempDocs.splice(index, 1, tempDoc)
        setDocs(tempDocs)
    }

    function addDeltaEntry(entry) {
        let tempDoc = {...doc, af3899d: doc.af3899d || []}
        tempDoc.af3899d = [...tempDoc.af3899d, entry]
        let tempDocs = [...docs]
        tempDocs.splice(index, 1, tempDoc)
        setDocs(tempDocs)
    }

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <CardHeader
                    avatar={<Avatar><DescriptionIcon fontSize="large" /></Avatar>}
                    title="AF Form 3899"
                    subheader={lastModified}
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
                        title="AF Form 3899A"
                    >
                        <IconButton
                            onClick={() => setAlphaOpen(true)}
                        >
                            <NotesIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="AF Form 3899D"
                    >
                        <IconButton
                            onClick={() => setDeltaOpen(true)}
                        >
                            <MonitorHeartIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="AF Form 3899I"
                    >
                        <IconButton
                            
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
            <ThirtyEightNintyNineForm
                open={open}
                close={() => setOpen(false)}
                doc={doc}
                patient={patient}
            />
            <AF3899A
                open={alphaOpen}
                close={() => setAlphaOpen(false)}
                entries={doc.af3899a || []}
                addEntry={addAlphaEntry}
            />
            <AF3899D
                open={deltaOpen}
                close={() => setDeltaOpen(false)}
                entries={doc.af3899d || []}
                addEntry={addDeltaEntry}
            />
        </Grid>
    )
}

export default AF3899Card