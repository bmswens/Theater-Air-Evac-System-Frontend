// React
import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

const blankEntry = {
    datetime: new Date(),
    pulse: '',
    rr: '',
    bloodPressure: '',
    map: '',
    co2: '',
    spo2: '',
    pain: ''
}

function VitalsForm(props) {

    const {
        open,
        close,
        addEntry
    } = props

    const [data, setData] = React.useState(blankEntry)

    function handleClose() {
        setData(blankEntry)
        close()
    }

    function submit() {
        addEntry(data)
        setData(blankEntry)
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
                Vitals Form
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <Stack spacing={1} direction="row">
                        {
                            Object.keys(blankEntry).map(key => {
                                if (key !== 'datetime') {
                                    return (
                                        <TextField
                                            key={key}
                                            fullWidth
                                            label={key}
                                            value={data[key]}
                                            onChange={event => setData({ ...data, [key]: event.target.value })}
                                        />
                                    )
                                }
                                return null
                            })
                        }
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog >
    )

}

export default VitalsForm