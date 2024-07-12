// React
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, LinearProgress, Stack, Switch, TextField, Tooltip } from '@mui/material'
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

    const [syncURL, setSyncURL] = useLocalStorage('sync-url', 'https://med.cyberdeck.swenson.software')
    const [deleteOnSync, setDeleteOnSync] = useLocalStorage('delete-on-sync', false)

    // only sync some
    const [selected, setSelected] = React.useState([])

    // build stuff to push, can't be done in effect
    const [patients, setPatients] = useLocalStorage('patients', {})

    // for autocomplete
    let patientMapping = {}
    for (let dodid in patients) {
        let patient = patients[dodid]
        patientMapping[`${patient.firstName} ${patient.lastName} (${dodid})`] = patient
    }

    React.useEffect(() => {
        // just going to put this here to avoid useMemo
        let patientMapping = {}
        for (let dodid in patients) {
            let patient = patients[dodid]
            patientMapping[`${patient.firstName} ${patient.lastName} (${dodid})`] = patient
        }
        async function upload() {
            try {
                let localPatients = { ...patients }
                if (selected.length) {
                    localPatients = {}
                    for (let label of selected) {
                        let patient = patientMapping[label]
                        localPatients[patient.dodid] = patient
                    }
                }
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
                    let docsSent = await fetch(`${url}/docs`, {
                        method: "POST",
                        body: JSON.stringify(docs),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    if (!patientSent.ok) {
                        let msg = await patientSent.body()
                        alert(msg)
                    }
                    if (!docsSent.ok) {
                        let msg = await docsSent.body()
                        alert(msg)
                    }
                    if (deleteOnSync && docsSent.ok && patientSent.ok) {
                        localStorage.removeItem(`${dodid}-documents`)
                        delete localPatients[dodid]
                    }
                }
                if (deleteOnSync) {
                    setPatients(localPatients)
                }
            }
            catch (e) {
                alert(e.message)
            }
            setProcessing(false)
        }
        async function download() {
            try {
                let resp = await fetch(`${syncURL}/patients`)
                if (!resp.ok) {
                    let msg = await resp.body()
                    alert(msg)
                }
                let serverPatients = await resp.json()
                for (let dodid in serverPatients) {
                    let docResp = await fetch(`${syncURL}/patients/${dodid}/docs`)
                    if (!docResp.ok) {
                        let msg = await docResp.body()
                        alert(msg)
                    }
                    let docs = await docResp.json()
                    localStorage.setItem(`${dodid}-documents`, JSON.stringify(docs))
                }
                setPatients({ ...patients, ...serverPatients })
            }
            catch (e) {
                alert(e.message)
            }
            setProcessing(false)
        }
        if (processing === "upload") {
            upload()
        }
        else if (processing === "download") {
            download()
        }
    }, [processing, deleteOnSync, patients, setPatients, syncURL, selected])

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
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <TextField
                        label="URL"
                        fullWidth
                        value={syncURL}
                        onChange={event => setSyncURL(event.target.value)}
                    />
                    <Autocomplete
                        fullWidth
                        multiple
                        value={selected}
                        onChange={(event, newValue) => setSelected(newValue)}
                        renderInput={params => <TextField {...params} label="To Sync" helperText="Leave blank to sync all patients." />}
                        options={Object.keys(patientMapping)}
                    />
                    <Stack spacing={1} direction="row">
                        <FormControlLabel label="Delete After Sync" control={<Switch checked={deleteOnSync} onChange={event => setDeleteOnSync(event.target.checked)} />} />
                        <Box sx={{ flexGrow: 1 }} />
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
                    {processing ? <LinearProgress /> : null}
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