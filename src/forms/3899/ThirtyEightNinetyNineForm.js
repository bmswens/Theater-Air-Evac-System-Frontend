// React
import React from 'react'

// MUI
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// dates
import dayjs from 'dayjs'


function ThirtyEightNintyNineForm(props) {

    const {
        open,
        close,
        patient
    } = props

    let now = dayjs(new Date())
    let dob = dayjs(patient.dob)
    let age = now.diff(dob, 'year')

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="Center">
                AF Form 3899
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1}}>
                    <TextField
                        label="Name"
                        disabled
                        value={`${patient.lastName}, ${patient.firstName}`}
                    />
                    <TextField
                        label="DODID"
                        disabled
                        value={patient.dodid}
                    />
                    <TextField
                        label="Date of Birth"
                        disabled
                        value={patient.dob}
                    />
                    <TextField
                        label="Age"
                        disabled
                        value={age}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )

}

export default ThirtyEightNintyNineForm