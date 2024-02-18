// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

const emptyData = {
    datetime: new Date(),
    pulse: '',
    bloodPressure: '',
    respiratoryRate: '',
    oxygenSat: '',
    avpu: '',
    pain: ''
}

function AddVitalsForm(props) {
    const {
        open,
        close,
        addVitals
    } = props

    const [data, setData] = React.useState(emptyData)

    function submit() {
        addVitals(data)
        handleClose()
    }

    function handleClose() {
        setData(emptyData)
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle align="center">
                Add Vital Sign Measurements
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={1} sx={{marginTop: 1}}>
                <TextField
                    fullWidth
                    label="Pulse"
                    placeholder='92 / Neck'
                    value={data.pulse}
                    onChange={event => setData({...data, pulse: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="BP"
                    placeholder='120 / 80'
                    value={data.bloodPressure}
                    onChange={event => setData({...data, bloodPressure: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="RR"
                    value={data.respiratoryRate}
                    onChange={event => setData({...data, respiratoryRate: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="O2"
                    value={data.oxygenSat}
                    onChange={event => setData({...data, oxygenSat: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="AVPU"
                    value={data.avpu}
                    onChange={event => setData({...data, avpu: event.target.value})}
                />
                <TextField
                    fullWidth
                    label="Pain"
                    value={data.pain}
                    onChange={event => setData({...data, pain: event.target.value})}
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
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddVitalsForm