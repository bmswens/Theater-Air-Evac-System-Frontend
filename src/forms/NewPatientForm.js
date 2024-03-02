// React
import React from 'react'

// MUI 
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// hooks
import { useLocalStorage } from 'usehooks-ts'

// custom
import { DatePicker } from '@mui/x-date-pickers'

const defaultPatient = {
    firstName: '',
    lastName: '',
    dodid: '',
    gender: [],
    bloodtype: '',
    dob: null,
    allergies: [],
}

function NewPatientForm(props) {
    const {
        open,
        close
    } = props

    const [patients, setPatients] = useLocalStorage('patients', [])
    const [patient, setPatient] = React.useState(defaultPatient)

    function handleClose() {
        setPatient(defaultPatient)
        close()
    }

    function submit() {
        setPatients({...patients, [patient.dodid]: patient})
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                New Patient
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1}}>
                    <TextField
                        label="DODID"
                        value={patient.dodid}
                        onChange={event => setPatient({ ...patient, dodid: event.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="First Name"
                        value={patient.firstName}
                        onChange={event => setPatient({ ...patient, firstName: event.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={patient.lastName}
                        onChange={event => setPatient({ ...patient, lastName: event.target.value })}
                        fullWidth
                    />
                    <DatePicker
                        label="Date Of Birth"
                        fullWidth
                        value={patient.dob}
                        onChange={value => setPatient({...patient, dob: value})}
                    />
                    <TextField
                        label="Blood Type"
                        value={patient.bloodType}
                        onChange={event => setPatient({ ...patient, bloodType: event.target.value })}
                        fullWidth
                    />
                    <Autocomplete
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Gender" />}
                        options={[
                            "Male",
                            "Female"
                        ]}
                        value={patient.patient}
                        onChange={(_, newValue) => setPatient({...patient, gender: newValue})}
                    />
                    <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Allergies" />}
                        options={[
                            "Ibuprofen",
                            "Shellfish",
                            "Cats"
                        ]}
                        value={patient.allergies}
                        onChange={(_, newValue) => setPatient({...patient, allergies: newValue})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    size="large"
                >
                    Cancel
                </Button>
                <Button
                    onClick={submit}
                    variant="contained"
                    size="large"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewPatientForm