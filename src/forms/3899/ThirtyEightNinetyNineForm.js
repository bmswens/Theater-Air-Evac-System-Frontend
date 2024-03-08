// React
import React from 'react'

// MUI
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material'

// dates
import dayjs from 'dayjs'
import ReactSignatureCanvas from 'react-signature-canvas'
import useStorage from '../../api/useStorage'

const blank3899 = {
    status: "Active",
    service: "Air Force",
    grade: [],
    unit: '',
    unitPhone: '',
    citNumber: '',
    originTreatmentFac: '',
    originTreatmentFacNumber: '',
    destinationTreatmentFac: '',
    destinationTreatmentFacNumber: '',

    transferSummary: ''
}

// build pay grades
const grades = []
for (let letter of ["E", "O"]) {
    for (let i = 1; i < 10; i++) {
        grades.push(`${letter}${i}`)
    }
}

function ThirtyEightNintyNineForm(props) {

    const {
        open,
        close,
        patient,
        doc
    } = props

    const viewOnly = Boolean(doc ? true : false)

    let now = dayjs(new Date())
    let dob = dayjs(patient.dob)
    let age = now.diff(dob, 'year')

    const [docs, setDocs] = useStorage(`${patient.dodid}-documents`, [])
    const [data, setData] = React.useState(blank3899)
    const physicanSigRef = React.createRef()
    const flightSigRef = React.createRef()
    const [displaySigs, setDisplaySigs] = React.useState(false)

    React.useEffect(() => {
        if (doc) {
            setData(doc.data)
        }
    }, [doc])

    React.useEffect(() => {
        if (displaySigs && viewOnly && physicanSigRef.current && flightSigRef.current) {
            physicanSigRef.current.fromData(data.physicanSig)
            physicanSigRef.current.off()
            flightSigRef.current.fromData(data.flightSig)
            flightSigRef.current.off()
        }
    }, [displaySigs, data, viewOnly, physicanSigRef, flightSigRef])

    function setParam(param, value) {
        setData({
            ...data,
            [param]: value
        })
    }

    function handleClose() {
        if (!viewOnly) {
            setData({blank3899})
        }
        close()
    }

    function submit() {
        const physicanSig = physicanSigRef.current.toData()
        const flightSig = flightSigRef.current.toData()
        let doc = {
            name: "AF Form 3899",
            lastModified: new Date(),
            data: {
                ...patient,
                ...data,
                physicanSig,
                flightSig,
                af3899a: [],
                af3899d: [],
                af3899i: []
            }
        }
        setDocs([...docs, doc])
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="Center">
                AF Form 3899
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1, overflow: "scroll" }}>
                    <Divider>
                        Patient Identification
                    </Divider>
                    <TextField
                        label="Name"
                        fullWidth
                        disabled
                        value={`${patient.lastName}, ${patient.firstName}`}
                    />
                    <TextField
                        label="DODID"
                        fullWidth
                        disabled
                        value={patient.dodid}
                    />
                    <TextField
                        label="Date of Birth"
                        fullWidth
                        disabled
                        value={patient.dob}
                    />
                    <TextField
                        label="Age"
                        fullWidth
                        disabled
                        value={age}
                    />
                    <TextField
                        label="Sex"
                        fullWidth
                        disabled
                        value={patient.gender}
                    />
                    <Autocomplete
                        value={data.status}
                        onChange={(event, newValue) => setParam("status", newValue)}
                        options={[
                            "Active",
                            "Guard",
                            "Reserve",
                            "Local",
                            "National",
                            "Civ",
                            "POW"
                        ]}
                        renderInput={params => <TextField {...params} label="Status" />}
                        fullWidth
                        disabled={viewOnly}
                    />
                    <Autocomplete
                        value={data.service}
                        onChange={(event, newValue) => setParam("service", newValue)}
                        options={[
                            "Air Force",
                            "Space Force",
                            "An Inferior Service"
                        ]}
                        renderInput={params => <TextField {...params} label="Service" />}
                        fullWidth
                        disabled={viewOnly}
                    />
                    <Autocomplete
                        value={data.grade}
                        onChange={(event, newValue) => setParam("grade", newValue)}
                        options={grades}
                        renderInput={params => <TextField {...params} label="Grade" />}
                        fullWidth
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Unit"
                        fullWidth
                        value={data.unit}
                        onChange={event => setParam("unit", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Unit Phone Number"
                        fullWidth
                        value={data.unitPhone}
                        onChange={event => setParam("unitPhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Cite Number"
                        fullWidth
                        value={data.citNumber}
                        onChange={event => setParam("citNumber", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Divider>
                        Validation Information
                    </Divider>
                    <TextField
                        label="Origin Treatment Facility"
                        fullWidth
                        value={data.originTreatmentFac}
                        onChange={event => setParam("originTreatmentFac", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Origin Treatment Facility Phone Number"
                        fullWidth
                        value={data.originTreatmentFacNumber}
                        onChange={event => setParam("originTreatmentFacNumber", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Destination Treatment Facility"
                        fullWidth
                        value={data.destinationTreatmentFac}
                        onChange={event => setParam("destinationTreatmentFac", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Destination Treatment Facility Phone Number"
                        fullWidth
                        value={data.destinationTreatmentFacNumber}
                        onChange={event => setParam("destinationTreatmentFacNumber", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Typography>
                        Other fields coming soon...
                    </Typography>
                    <Divider>
                        Other Information
                    </Divider>
                    <Typography>
                        Other sections coming soon...
                    </Typography>
                    <Divider>
                        Clinical Information
                    </Divider>
                    <Typography>
                        Other sections coming soon...
                    </Typography>
                    <Divider>
                        Pertinent Clinical History
                    </Divider>
                    <TextField
                        label="Transfer Summary"
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                        value={data.transferSummary}
                        onChange={event => setParam("transferSummary", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Divider textAlign='left'>
                        Physican's Signature (Sign Below)
                    </Divider>
                        <ReactSignatureCanvas
                            penColor='white'
                            ref={physicanSigRef}
                            backgroundColor='#121212'
                        />
                    <Divider textAlign='left'>
                        Flight Surgeon's Signature (Sign Below)
                    </Divider>
                        <ReactSignatureCanvas
                            penColor='white'
                            ref={flightSigRef}
                            backgroundColor='#121212'
                        />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    {viewOnly ? "Close" : "Cancel"}
                </Button>
                {viewOnly ? 
                    <Button
                        variant="contained"
                        onClick={() => setDisplaySigs(!displaySigs)}
                    >
                        Show Signatures
                    </Button>
                :
                    <Button
                        variant="contained"
                        onClick={submit}
                    >
                        Submit
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )

}

export default ThirtyEightNintyNineForm