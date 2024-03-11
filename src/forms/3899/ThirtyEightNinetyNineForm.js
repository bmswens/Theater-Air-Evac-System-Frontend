// React
import React from 'react'

// MUI
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material'

// dates
import dayjs from 'dayjs'
import ReactSignatureCanvas from 'react-signature-canvas'
import useStorage from '../../api/useStorage'
import LabeledCheckbox from '../../components/LabeledCheckbox'

const blank3899 = {
    status: "Active",
    service: "Air Force",
    grade: null,
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
    classification: null, // autocomplete
    ambulatory: false,
    litter: false,
    reasonRegulated: '',
    maxStops: '',
    maxRons: '',
    altitudeRestriction: '',
    ccatRequired: false,
    attendantInfo: '',
    precedence: null, // autocomplete
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
    // Section 4
    diagnosis: '',
    wbc: '',
    hgb: '',
    hct: '',
    otherLabs: '',
    weight: '',
    casualtyType: null, // autcomplete
    // vitals are skipped because they're in other section
    infectionPrecautions: '',
    lmp: '',
    lastBowel: '',
    highRiskSkin: false,
    // issues
    hearingImpaired: false,
    communicationBarriers: false,
    visionImparied: false,
    cardiacHx: false,
    diabetes: false,
    motionSickness: false,
    earSinusProblem: false,
    respiratoryIssues: false,
    medicatoinOnPhys: false,
    hyptertension: false,
    dizziness: false,
    voidingIssues: false,
    longTermMeds: false,
    selfMedicate: false,
    enoughMeds: false,
    knowsMeds: false,
    // special equipment
    suction: false,
    traction: false,
    orthopedic: false,
    ngTube: false,
    monitor: false,
    restraints: false,
    foley: false,
    trach: false,
    chestTubes: false,
    incubator: false,
    ivPumps: false,
    iv: false,
    ivLocation: '',
    cast: false,
    castLocation: '',
    castBivaled: false,
    ventilator: false,
    ventilatorSettings: '',
    equipmentOther: '',
    // diet info
    npo: false,
    soft: false,
    fullLiq: false,
    ciLiq: false,
    reg: false,
    renal: false,
    gmProtein: '',
    gmNa: '',
    meqK: '',
    MagSulf: '',
    feedingTube: false,
    tubeType: '',
    tubeCChr: '',
    tubeDiscInFlight: '',
    cardiac: false,
    diabetic: false,
    calories: '',
    infantForm: false,
    pediatriacAge: '',
    tpn: false,
    other: '',
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
            setData({ ...blank3899 })
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
                af3899b: [],
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
                        onChange={(event, newValue) => setData({ ...data, classification: newValue })}
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
                        onChange={(event, newValue) => setData({ ...data, precedence: newValue })}
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
                    <Autocomplete
                        fullWidth
                        value={data.waivers}
                        freeSolo
                        multiple
                        options={[]}
                        disabled={viewOnly}
                        renderInput={params => <TextField {...params} label="Waivers" />}
                        onChange={(event, newValue) => setData({ ...data, waivers: newValue })}
                    />
                    <Divider>
                        Clinical Information
                    </Divider>
                    <TextField
                        label="Diagnosis"
                        fullWidth
                        value={data.diagnosis}
                        onChange={event => setParam("diagonsis", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Autocomplete
                        fullWidth
                        value={patient.allergies}
                        freeSolo
                        multiple
                        options={[]}
                        disabled={true}
                        renderInput={params => <TextField {...params} label="Allergies" />}
                    />
                    <TextField
                        label="WBC"
                        fullWidth
                        value={data.wbc}
                        onChange={event => setParam("wbc", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="HGB"
                        fullWidth
                        value={data.hgb}
                        onChange={event => setParam("hgb", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="HCT"
                        fullWidth
                        value={data.hct}
                        onChange={event => setParam("hct", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Other Labs"
                        fullWidth
                        value={data.otherLabs}
                        onChange={event => setParam("otherLabs", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Weight"
                        fullWidth
                        value={data.weight}
                        onChange={event => setParam("weight", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Blood Type"
                        fullWidth
                        value={patient.bloodType}
                        disabled={true}
                    />
                    <Autocomplete
                        fullWidth
                        value={data.casualtyType}
                        options={[
                            "Battle Casualty",
                            "Disease",
                            "Non-battle Injury"
                        ]}
                        disabled={viewOnly}
                        renderInput={params => <TextField {...params} label="Casualty Type" />}
                        onChange={(event, newValue) => setData({ ...data, casualtyType: [newValue] })}
                    />
                    <TextField
                        label="Infection Control Precautions"
                        fullWidth
                        value={data.infectionPrecautions}
                        onChange={event => setParam("infectionPrecautions", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="LMP"
                        fullWidth
                        value={data.lmp}
                        onChange={event => setParam("lmp", event.target.value)}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Date Of Last Bowel Movement"
                        fullWidth
                        value={data.lastBowel}
                        onChange={event => setParam("lastBowel", event.target.value)}
                        disabled={viewOnly}
                    />
                    <LabeledCheckbox
                        label="High Risk for Skin Breakdown"
                        checked={data.highRiskSkin}
                        onChange={event => setData({ ...data, highRiskSkin: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <Stack spacing={1} direction="row">
                        <Stack spacing={1}>
                            <LabeledCheckbox
                                label="Hearing Impaired"
                                checked={data.hearingImpaired}
                                onChange={event => setData({ ...data, hearingImpaired: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Communication Barriers"
                                checked={data.communicationBarriers}
                                onChange={event => setData({ ...data, communicationBarriers: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Vision Impaired"
                                checked={data.visionImparied}
                                onChange={event => setData({ ...data, visionImparied: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Cardiac Hx"
                                checked={data.cardiacHx}
                                onChange={event => setData({ ...data, cardiacHx: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Diabetes"
                                checked={data.diabetes}
                                onChange={event => setData({ ...data, diabetes: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Motion Sickness"
                                checked={data.motionSickness}
                                onChange={event => setData({ ...data, motionSickness: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Ear/Sinus Problems"
                                checked={data.earSinusProblem}
                                onChange={event => setData({ ...data, earSinusProblem: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Respiratory Difficulty"
                                checked={data.respiratoryIssues}
                                onChange={event => setData({ ...data, respiratoryIssues: event.target.checked })}
                                disabled={viewOnly}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <LabeledCheckbox
                                label="Hypertension"
                                checked={data.hyptertension}
                                onChange={event => setData({ ...data, hyptertension: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Dizziness"
                                checked={data.dizziness}
                                onChange={event => setData({ ...data, dizziness: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Voiding Difficulty"
                                checked={data.voidingIssues}
                                onChange={event => setData({ ...data, voidingIssues: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Takes Long Term Meds"
                                checked={data.longTermMeds}
                                onChange={event => setData({ ...data, longTermMeds: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Will Self Medicate"
                                checked={data.selfMedicate}
                                onChange={event => setData({ ...data, selfMedicate: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Has Adaquete Supply of Meds"
                                checked={data.enoughMeds}
                                onChange={event => setData({ ...data, enoughMeds: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Knows How to Take Meds"
                                checked={data.knowsMeds}
                                onChange={event => setData({ ...data, knowsMeds: event.target.checked })}
                                disabled={viewOnly}
                            />
                        </Stack>
                    </Stack>
                    <LabeledCheckbox
                        label="Medication On Physican's Orders"
                        checked={data.medicatoinOnPhys}
                        onChange={event => setData({ ...data, medicatoinOnPhys: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <Typography variant="h6" align="center">
                        Special Equipment
                    </Typography>
                    <Stack spacing={1} direction="row">
                        <Stack spacing={1}>
                            <LabeledCheckbox
                                label="Suction"
                                checked={data.suction}
                                onChange={event => setData({ ...data, suction: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="NG Tube"
                                checked={data.ngTube}
                                onChange={event => setData({ ...data, ngTube: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Foley"
                                checked={data.foley}
                                onChange={event => setData({ ...data, foley: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Incubator"
                                checked={data.incubator}
                                onChange={event => setData({ ...data, incubator: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Traction"
                                checked={data.traction}
                                onChange={event => setData({ ...data, traction: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Monitor"
                                checked={data.monitor}
                                onChange={event => setData({ ...data, monitor: event.target.checked })}
                                disabled={viewOnly}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <LabeledCheckbox
                                label="Trach"
                                checked={data.trach}
                                onChange={event => setData({ ...data, trach: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Orthopedic Devices"
                                checked={data.orthopedic}
                                onChange={event => setData({ ...data, ortho: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Restraints"
                                checked={data.restraints}
                                onChange={event => setData({ ...data, restraints: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="Chest Tubes"
                                checked={data.chestTubes}
                                onChange={event => setData({ ...data, chestTubes: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <LabeledCheckbox
                                label="IV"
                                checked={data.iv}
                                onChange={event => setData({ ...data, iv: event.target.checked })}
                                disabled={viewOnly}
                            />
                            <TextField
                                label="IV Location"
                                fullWidth
                                value={data.ivLocation}
                                onChange={event => setParam("ivLocation", event.target.value)}
                                disabled={viewOnly}
                            />
                        </Stack>

                    </Stack>
                    <TextField
                        label="Other Special Equipment"
                        fullWidth
                        value={data.equipmentOther}
                        onChange={event => setParam("equipmentOther", event.target.value)}
                        disabled={viewOnly}
                    />
                    <Stack spacing={1} direction="row">
                        <LabeledCheckbox
                            label="Cast"
                            checked={data.cast}
                            onChange={event => setData({ ...data, cast: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Cast Location"
                            fullWidth
                            value={data.castLocation}
                            onChange={event => setParam("castLocation", event.target.value)}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Bivaled"
                            checked={data.castBivaled}
                            onChange={event => setData({ ...data, castBivaled: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </Stack>
                    <Typography variant="h6" align="center">
                        Diet Information
                    </Typography>
                    <Stack spacing={1} direction="row">
                        <LabeledCheckbox
                            label="NPO"
                            checked={data.npo}
                            onChange={event => setData({ ...data, npo: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Soft"
                            checked={data.soft}
                            onChange={event => setData({ ...data, soft: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Full Liq"
                            checked={data.fullLiq}
                            onChange={event => setData({ ...data, fullLiq: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="CI Liq"
                            checked={data.ciLiq}
                            onChange={event => setData({ ...data, ciLiq: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Reg"
                            checked={data.reg}
                            onChange={event => setData({ ...data, reg: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <LabeledCheckbox
                            label="Renal"
                            checked={data.renal}
                            onChange={event => setData({ ...data, renal: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Gm Protein"
                            fullWidth
                            value={data.gmProtein}
                            onChange={event => setParam("gmProtein", event.target.value)}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Gm Na"
                            fullWidth
                            value={data.gmNa}
                            onChange={event => setParam("gmNa", event.target.value)}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Meq K"
                            fullWidth
                            value={data.meqK}
                            onChange={event => setParam("meqK", event.target.value)}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Mag Sulfate"
                            fullWidth
                            value={data.MagSulf}
                            onChange={event => setParam("magSulf", event.target.value)}
                            disabled={viewOnly}
                        />
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <LabeledCheckbox
                            label="Feeding Tube"
                            checked={data.feedingTube}
                            onChange={event => setData({ ...data, feedingTube: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Feeding Tube Type"
                            fullWidth
                            value={data.tubeType}
                            onChange={event => setParam("tubeType", event.target.value)}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="CC/Hr"
                            fullWidth
                            value={data.tubeCChr}
                            onChange={event => setParam("tubeCChr", event.target.value)}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Discontinue In Flight"
                            checked={data.tubeDiscInFlight}
                            onChange={event => setData({ ...data, tubeDiscInFlight: event.target.checked })}
                            disabled={viewOnly}
                        />
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <LabeledCheckbox
                            label="Cardiac"
                            checked={data.cardiac}
                            onChange={event => setData({ ...data, cardiac: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Diabetic"
                            checked={data.diabetic}
                            onChange={event => setData({ ...data, diabetic: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Cal"
                            fullWidth
                            value={data.calories}
                            onChange={event => setParam("calories", event.target.value)}
                            disabled={viewOnly}
                        />
                        <LabeledCheckbox
                            label="Infant Formula"
                            checked={data.infantForm}
                            onChange={event => setData({ ...data, infantForm: event.target.checked })}
                            disabled={viewOnly}
                        />
                        <TextField
                            label="Pediatric Age"
                            fullWidth
                            value={data.pediatriacAge}
                            onChange={event => setParam("pediatriacAge", event.target.value)}
                            disabled={viewOnly}
                        />
                    </Stack>
                    <LabeledCheckbox
                        label="TPN"
                        checked={data.tpn}
                        onChange={event => setData({ ...data, tpn: event.target.checked })}
                        disabled={viewOnly}
                    />
                    <TextField
                        label="Other"
                        fullWidth
                        value={data.other}
                        onChange={event => setParam("other", event.target.value)}
                        disabled={viewOnly}
                    />
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
        </Dialog >
    )

}

export default ThirtyEightNintyNineForm