// React
import React from 'react'

// MUI
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormLabel, Stack, TextField, Typography } from '@mui/material'

// dates
import dayjs from 'dayjs'
import ReactSignatureCanvas from 'react-signature-canvas'
import useStorage from '../../api/useStorage'
import LabeledCheckbox from '../../components/LabeledCheckbox'

const blank3899 = {
    status: "Active",
    service: "Air Force",
    grade: [],
    unit: '',
    unitPhone: '',
    citNumber: '',
    // section 2
    originTreatmentFac: '',
    originTreatmentFacNumber: '',
    destinationTreatmentFac: '',
    destinationTreatmentFacNumber: '',
    readyDate: '',
    appointmentDate: '',
    attendantsMed: '',
    attendeantsNonMed: '',
    classification: [], // autocomplete
    ambulatory: false,
    litter: false,
    reasonRegulated: '',
    maxStops: '',
    maxRons: '',
    altitudeRestriction: '',
    ccatRequired: false,
    attendantInfo: '',
    precedence: [], // autocomplete
    // Section 3
    attendingPhysName: '',
    attendingPhysPhone: '',
    attendingPhysEmail: '',
    acceptingPhysName: '',
    acceptingPhysPhone: '',
    acceptingPhysEmail: '',
    originPhone: '',
    desinationPhone: '',
    insuranceCompany: '',
    insuranceAddress: '',
    insurancePhone: '',
    insuranceNumber: '',
    relation: '',
    waivers: [], // freeform auto
    // Section 5
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
                    <TextField
                        label="Ready Date (Julian)"
                        fullWidth
                        value={data.readyDate}
                        onChange={event => setParam("readyDate", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Appointment Date"
                        fullWidth
                        value={data.appointmentDate}
                        onChange={event => setParam("appointmentDate", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Number of Medical Attendants"
                        fullWidth
                        value={data.attendantsMed}
                        onChange={event => setParam("attendantsMed", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Number of Non-Medical Attendants"
                        fullWidth
                        value={data.attendeantsNonMed}
                        onChange={event => setParam("attendeantsNonMed", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Autocomplete
                        fullWidth
                        value={data.classification}
                        options={[
                            "1A",
                            "1B",
                            "1C",
                            "2A",
                            "2B",
                            "3A",
                            "3B",
                            "3C",
                            "4A",
                            "4B",
                            "4C",
                            "4D",
                            "4E",
                            "5A",
                            "5B",
                            "5C",
                            "5D",
                            "5E",
                            "5F"
                        ]}
                        disabled={viewOnly}
                        renderInput={params => <TextField {...params} label="Classification" />}
                        onChange={(event, newValue) => setData({...data, classification: newValue})}
                    />
                    <LabeledCheckbox
                        label="Ambulatory"
                        checked={data.ambulatory}
                        onChange={event => setData({ ...data, ambulatory: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <LabeledCheckbox
                        label="Litter"
                        checked={data.litter}
                        onChange={event => setData({ ...data, litter: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Reason Regulated"
                        fullWidth
                        value={data.reasonRegulated}
                        onChange={event => setParam("reasonRegulated", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Max Number of Stops"
                        fullWidth
                        value={data.maxStops}
                        onChange={event => setParam("maxStops", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Max Number of RONs"
                        fullWidth
                        value={data.maxRons}
                        onChange={event => setParam("maxRons", event.target.value)}
                        disabled={viewOnly}
                        helperText="RON: Remain Overnight"
                    />
                    <TextField
                        label="Altitude Restriction"
                        fullWidth
                        value={data.altitudeRestriction}
                        onChange={event => setParam("altitudeRestriction", event.target.value)}
                        disabled={viewOnly}
                    />
                    <LabeledCheckbox
                        label="CCAT Required"
                        checked={data.ccatRequired}
                        onChange={event => setData({ ...data, ccatRequired: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Attendant Info"
                        fullWidth
                        value={data.attendantInfo}
                        onChange={event => setParam("attendantInfo", event.target.value)}
                        disabled={viewOnly}
                        helperText="Name, Sex, Weight, and Rank of Attendants."
                    />
                    <Autocomplete
                        fullWidth
                        value={data.precedence}
                        options={[
                            "Urgent",
                            "Priority",
                            "Routine"
                        ]}
                        disabled={viewOnly}
                        renderInput={params => <TextField {...params} label="Precedence" />}
                        onChange={(event, newValue) => setData({...data, precedence: newValue})}
                    />
                    <Divider>
                        Other Information
                    </Divider>
                    <TextField
                        label="Attending Physican Name"
                        fullWidth
                        value={data.attendingPhysName}
                        onChange={event => setParam("attendingPhysName", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Attending Physican Phone Number"
                        fullWidth
                        value={data.attendingPhysPhone}
                        onChange={event => setParam("attendingPhysPhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Attending Physican Email"
                        fullWidth
                        value={data.attendingPhysEmail}
                        onChange={event => setParam("attendingPhysEmail", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Accepting Physican Name"
                        fullWidth
                        value={data.acceptingPhysName}
                        onChange={event => setParam("acceptingPhysName", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Accepting Physican Phone Number"
                        fullWidth
                        value={data.acceptingPhysPhone}
                        onChange={event => setParam("acceptingPhysPhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Accepting Physican Email"
                        fullWidth
                        value={data.acceptingPhysEmail}
                        onChange={event => setParam("acceptingPhysEmail", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Origination Transportation 24 Hour Phone Number"
                        fullWidth
                        value={data.originPhone}
                        onChange={event => setParam("originPhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Destination Transportation 24 Hour Phone Number"
                        fullWidth
                        value={data.desinationPhone}
                        onChange={event => setParam("desinationPhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Insurance Company"
                        fullWidth
                        value={data.insuranceCompany}
                        onChange={event => setParam("insuranceCompany", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Insurance Company Address"
                        fullWidth
                        value={data.insuranceAddress}
                        onChange={event => setParam("insuranceAddress", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Insurance Company Phone Number"
                        fullWidth
                        value={data.insurancePhone}
                        onChange={event => setParam("insurancePhone", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Policy Number"
                        fullWidth
                        value={data.insuranceNumber}
                        onChange={event => setParam("insuranceNumber", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Relationship to Policy Holder"
                        fullWidth
                        value={data.relation}
                        onChange={event => setParam("relation", event.target.value)}
                        disabled={viewOnly}
                    />
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