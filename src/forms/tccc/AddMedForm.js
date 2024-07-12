// React
import React from 'react'

// MUI
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// data
import appData from '../../data'

const emptyData = {
    datetime: new Date(),
    type: '',
    name: '',
    volume: '',
    route: ''
}

function AddMedForm(props) {
    const {
        open,
        close,
        addMedication
    } = props

    const [data, setData] = React.useState(emptyData)

    function submit() {
        addMedication(data)
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
                Add Medication Entry
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                    <TextField
                        fullWidth
                        label="Type"
                        value={data.type}
                        onChange={event => setData({ ...data, type: event.target.value })}
                    />
                    <Autocomplete
                        fullWidth
                        value={data.name}
                        onChange={(event, newValue) => setData({ ...data, name: newValue })}
                        renderInput={params => <TextField {...params} label="Medication" />}
                        options={appData.meds}
                    />
                    <TextField
                        fullWidth
                        label="Volume"
                        value={data.volume}
                        onChange={event => setData({ ...data, volume: event.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Route"
                        value={data.route}
                        onChange={event => setData({ ...data, route: event.target.value })}
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

export default AddMedForm