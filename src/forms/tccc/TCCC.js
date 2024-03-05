// React
import React from 'react'

// MUI
import { Autocomplete, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import InjurySection from './InjurySection'
import SignsAndSymptoms from './SignsAndSymptoms'
import TreatmentSection from './TreatmentSection'

function TCCC(props) {
    const {
        open,
        close,
        data
    } = props

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
                <Stack
                    spacing={1}
                    sx={{
                        marginTop: 1
                    }}
                >
                    <TextField
                        label="Battle Roster Number"
                        value={data.rosterNumber}
                        disabled
                    />
                    <FormControl>
                        <FormLabel id="evac-type-label">Evac Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="evac-type-label"
                            name="evac-type"
                            value={data.evacType}
                            row
                            sx={{justifyContent: "center"}}
                        >
                            <FormControlLabel value="urgent" control={<Radio disabled />} label="Urgent" />
                            <FormControlLabel value="priority" control={<Radio disabled />} label="Priority" />
                            <FormControlLabel value="routine" control={<Radio disabled />} label="Routine" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Name (first, last)"
                        value={data.name}
                        disabled
                    />
                    <TextField
                        label="DOD ID"
                        value={data.dodid}
                        disabled
                    />
                    <Autocomplete
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Gender" />}
                        disabled
                        value={data.gender}
                        options={[
                            "Male",
                            "Female"
                        ]}
                    />
                    <TextField
                        label="Datetime"
                        value={data.datetime}
                        disabled
                    />
                    <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        disabled
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
                    />
                    <InjurySection
                        injuries={data.injuries.filter(injury => injury.title.length ? true : false)}
                    />
                    <SignsAndSymptoms
                        rows={data.signsAndSymptoms}
                    />
                    <TreatmentSection 
                        circulation={data.circulation}
                        airway={data.airway}
                        breathing={data.breathing}
                        circulationRes={data.circulationRes}
                        medication={data.medication}
                        other={data.other}
                    />
                    <TextField
                        label="Notes"
                        value={data.notes}
                        fullWidth
                        multiline
                        minRows={5}
                        maxRows={15}
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="First Responder Name"
                        value={data.firstResponderName}
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="First Responder DOD ID"
                        value={data.firstResponderDodid}
                        disabled
                    />
                </Stack>
            </DialogContent>
        </Dialog>
    )

}

export default TCCC