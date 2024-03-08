// React
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import InjurySection from './InjurySection'
import useStorage from '../../api/useStorage'

const emptyForm = {
    rosterNumber: '',
    evacType: null,
    datetime: new Date(),
    mechanism: [],
    signsAndSymptoms: [{
        id: 0,
        datetime: new Date(),
        pulse: '',
        bloodPressure: '',
        respiratoryRate: '',
        oxygenSat: '',
        avpu: '',
        pain: ''
    }],
    circulation: {},
    airway: {},
    breathing: {},
    circulationRes: [],
    medication: [],
    other: {},
    notes: '',
    firstResponderName: '',
    firstResponderDodid: ''
}

function SignsAndSymptoms(props) {

    const {signsAndSymptoms, setSignsAndSymptoms} = props 

    return (
        <>
            <Typography variant='h6' align="center">Signs and Symptoms</Typography>
            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    label="Pulse"
                    placeholder='92 / Neck'
                    value={signsAndSymptoms.pulse}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, pulse: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="BP"
                    placeholder='120 / 80'
                    value={signsAndSymptoms.bloodPressure}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, bloodPressure: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="RR"
                    value={signsAndSymptoms.respiratoryRate}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, respiratoryRate: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="O2"
                    value={signsAndSymptoms.oxygenSat}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, oxygenSat: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="AVPU"
                    value={signsAndSymptoms.avpu}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, avpu: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="Pain"
                    value={signsAndSymptoms.pain}
                    onChange={event => setSignsAndSymptoms({...signsAndSymptoms, pain: event.target.value})}
                />
            </Stack>
        </>
    )
}

function BlankTCCC(props) {

    const {
        open,
        close,
        patient
    } = props

    const [data, setData] = React.useState(emptyForm)
    const [injuries, setInjuries] = React.useState([])
    const [injuryTitles, setInjuryTitles] = React.useState({})
    const [signsAndSymptoms, setSignsAndSymptoms] = React.useState(emptyForm.signsAndSymptoms[0])
    const [docs, setDocs] = useStorage(`${patient.dodid}-documents`, [])

    React.useEffect(() => {
        if (injuries.length === Object.keys(injuryTitles).length) {
            return
        }
        let tmpTitles = { ...injuryTitles }
        for (let i = 0; i < injuries.length; i++) {
            if (injuryTitles[i] === undefined) {
                tmpTitles[i] = ''
            }
        }
        setInjuryTitles(tmpTitles)
    }, [injuries, injuryTitles])

    function handleClose() {
        setData(emptyForm)
        close()
    }

    function submit() {
        let submission = {
            ...data,
            injuries: injuries.map((injury, index) => {return {...injury, title: injuryTitles[index]}}),
            signsAndSymptoms: [signsAndSymptoms],
        }
        let doc = {
            name: "Tactical Casualty Care Card",
            lastModified: new Date(),
            data: submission
        }
        setDocs([...docs, doc])
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                Tactical Combat Casualty Care Card
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <TextField
                        label="Battle Roster Number"
                        value={data.rosterNumber}
                        onChange={event => setData({ ...data, rosterNumber: event.target.value })}
                    />
                    <FormControl>
                        <FormLabel id="evac-type-label">Evac Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="evac-type-label"
                            name="evac-type"
                            value={data.evacType}
                            onChange={(event => setData({ ...data, evacType: event.target.value }))}
                            row
                            sx={{ justifyContent: "center" }}
                        >
                            <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
                            <FormControlLabel value="priority" control={<Radio />} label="Priority" />
                            <FormControlLabel value="routine" control={<Radio />} label="Routine" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Name (first, last)"
                        value={`${patient.lastName}, ${patient.firstName}`}
                        disabled
                    />
                    <TextField
                        label="Patient Identifier"
                        value={patient.dodid}
                        disabled
                    />
                    <Autocomplete
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Gender" />}
                        disabled
                        value={patient.gender}
                        options={[
                            "Male",
                            "Female"
                        ]}
                    />
                    <TextField
                        label="Datetime"
                        value={data.datetime.toISOString()}
                        disabled
                    />
                    <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Mechanism of Injury" />}
                        options={[
                            "Artillery",
                            "Blunt",
                            "Burn",
                            "Fall",
                            "Grenade",
                            "GSW",
                            "IED",
                            "Landmine",
                            "MVC",
                            "RPG"
                        ]}
                        value={data.mechanism}
                        onChange={(_, newValue) => setData({ ...data, mechanism: newValue })}
                    />
                    <InjurySection
                        injuries={injuries}
                        setInjuries={setInjuries}
                        injuryTitles={injuryTitles}
                        setInjuryTitles={setInjuryTitles}
                    />
                    <SignsAndSymptoms
                        signsAndSymptoms={signsAndSymptoms}
                        setSignsAndSymptoms={setSignsAndSymptoms}
                    />
                    <Typography variant="h6" align="center">
                        Treatments
                    </Typography>
                    <FormLabel id="circulation-control" align="center">Circulation Control</FormLabel>
                    <FormGroup row sx={{ justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, tqExtremity: event.target.checked}})} checked={data.circulation.tqExtremity} />} label="TQ-Extremity" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, tqJunctional: event.target.checked}})} checked={data.circulation.tqJunctional} />} label="TQ-Junctional" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, tqTruncal: event.target.checked}})} checked={data.circulation.tqTruncal} />} label="TQ-Truncal" />
                    </FormGroup>
                    <FormGroup row sx={{ justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, dressHemo: event.target.checked}})} checked={data.circulation.dressHemo} />} label="Dressing-Hemostatic" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, dressPressure: event.target.checked}})} checked={data.circulation.dressPressure} />} label="Dressing-Pressure" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, circulation: {...data.circulation, dressOther: event.target.checked}})} checked={data.circulation.dressOther} />} label="Dressing-Other" />
                    </FormGroup>
                    <FormLabel id="airway-control" align="center">Airway</FormLabel>
                    <FormGroup row sx={{ justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, airway: {...data.airway, intact: event.target.checked}})} checked={data.airway.intact} />} label="Intact" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, airway: {...data.airway, npa: event.target.checked}})} checked={data.airway.npa} />} label="NPA" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, airway: {...data.airway, cric: event.target.checked}})} checked={data.airway.cric} />} label="CRIC" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, airway: {...data.airway, etTube: event.target.checked}})} checked={data.airway.etTube} />} label="ET-Tube" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, airway: {...data.airway, sga: event.target.checked}})} checked={data.airway.sga} />} label="SGA" />
                    </FormGroup>
                    <FormLabel id="breathing-control" align="center">Breathing</FormLabel>
                    <FormGroup row sx={{ justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, breathing: {...data.breathing, o2: event.target.checked}})} checked={data.breathing.o2} />} label="O2" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, breathing: {...data.breathing, needle: event.target.checked}})} checked={data.breathing.needle} />} label="Needle-D" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, breathing: {...data.breathing, chestTube: event.target.checked}})} checked={data.breathing.chestTube} />} label="Chest-Tube" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, breathing: {...data.breathing, chestSeal: event.target.checked}})} checked={data.breathing.chestSeal} />} label="Chest-Seal" />
                    </FormGroup>
                    <FormLabel id="other-control" align="center">Other</FormLabel>
                    <FormGroup row sx={{ justifyContent: "center" }}>
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, other: {...data.other, pill: event.target.checked}})} checked={data.other.pill} />} label="Combat-Pill-Pack" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, other: {...data.other, eyeLeft: event.target.checked}})} checked={data.other.eyeLeft} />} label="Eye-Shield-Left" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, other: {...data.other, eyeRight: event.target.checked}})} checked={data.other.eyeRight} />} label="Eye-Shield-Right" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, other: {...data.other, splint: event.target.checked}})} checked={data.other.splint} />} label="Splint" />
                        <FormControlLabel control={<Checkbox onChange={event => setData({...data, other: {...data.other, hypothermia: event.target.checked}})} checked={data.other.hypothermia} />} label="Hypothermia-Prevention" />
                    </FormGroup>
                    <TextField
                        label="Notes"
                        onChange={event => setData({...data, notes: event.target.value})}
                        value={data.notes}
                        fullWidth
                        multiline
                        minRows={5}
                        maxRows={15}
                    />
                    <TextField
                        fullWidth
                        label="First Responder Name"
                        value={data.firstResponderName}
                        onChange={event => setData({...data, firstResponderName: event.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="First Responder DOD ID"
                        value={data.firstResponderDodid}
                        onChange={event => setData({...data, firstResponderDodid: event.target.value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    onClick={submit}
                    variant="contained"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default BlankTCCC