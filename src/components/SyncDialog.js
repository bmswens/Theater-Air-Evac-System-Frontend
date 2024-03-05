// React
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, LinearProgress, Stack, Switch, TextField, Tooltip } from '@mui/material'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

// MUI Icons
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

function SyncDialog(props) {
    const {
        open,
        close
    } = props

    const [processing, setProcessing] = React.useState(false)

    const [syncURL, setSyncURL] = useLocalStorage('sync-url', '')
    const [deleteOnSync, setDeleteOnSync] = useLocalStorage('delete-on-sync', false)
    
    // build stuff to push, can't be done in effect
    const [patients, setPatients] = useLocalStorage('patients', [])

    React.useEffect(() => {
        async function upload() {
            let localPatients = {...patients}
            for (let dodid in localPatients) {
                let url = `${syncURL}/patients/${dodid}`
                let patient = localPatients[dodid]
                let docs = localStorage.getItem(`${dodid}-documents`) || []
                if (docs.length) {
                    docs = JSON.parse(docs)
                }
                let patientSent = await fetch(url,
                    {
                        method: "POST",
                        body: JSON.stringify(patient),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                // forces it to create folder
                await fetch(`${url}/docs`)
                let docsSent = await fetch(`${url}/docs`,{
                    method: "POST",
                    body: JSON.stringify(docs),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (deleteOnSync && docsSent.ok && patientSent.ok) {
                    localStorage.removeItem(`${dodid}-documents`)
                    delete localPatients[dodid]
                }
            }
            if (deleteOnSync) {
                setPatients(localPatients)
            }
            setProcessing(false)
        }
        async function download() {
            let resp = await fetch(`${syncURL}/patients`)
            let serverPatients = await resp.json()
            for (let dodid in serverPatients) {
                let docResp = await fetch(`${syncURL}/patients/${dodid}/docs`)
                let docs = await docResp.json()
                localStorage.setItem(`${dodid}-documents`, JSON.stringify(docs))
            }
            setPatients({...patients, ...serverPatients})
            setProcessing(false)
        }
        if (processing === "upload") {
            upload()
        }
        else if (processing === "download") {
            download()
        }
    }, [processing, deleteOnSync, patients, setPatients, syncURL])

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                Sync
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <TextField
                        label="URL"
                        fullWidth
                        value={syncURL}
                        onChange={event => setSyncURL(event.target.value)}
                    />
                    <Stack spacing={1} direction="row">
                        <FormControlLabel label="Delete After Sync" control={<Switch checked={deleteOnSync} onChange={event => setDeleteOnSync(event.target.checked)} /> } />
                        <Box sx={{flexGrow: 1}} />
                        <Tooltip
                            title="Download"
                        >
                            <IconButton
                                disabled={syncURL.length === 0}
                                onClick={() => setProcessing("download")}
                            >
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Upload"
                        >
                            <IconButton
                                disabled={syncURL.length === 0}
                                onClick={() => setProcessing("upload")}
                            >
                                <UploadIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    { processing ? <LinearProgress /> : null}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SyncDialog