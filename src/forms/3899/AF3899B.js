// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material'

const blankEntry = {
    datetime: new Date(),
    note: '',
    initials: ''
}


function Entry(props) {
    const {
        datetime,
        note,
        initials
    } = props

    return (

        <TextField
            multiline
            label={datetime}
            value={note}
            disabled
            helperText={`Physician: ${initials}`}
        />


    )
}

function AF3899B(props) {

    const {
        open,
        close,
        entries,
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
                AF Form 3899B
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    {entries.map((entry, index) => <Entry key={index} {...entry} />)}
                    <Divider>
                        New Entry
                    </Divider>
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                        value={data.note}
                        onChange={event => setData({ ...data, note: event.target.value })}
                    />
                    <TextField
                        label="Initials"
                        fullWidth
                        value={data.initials}
                        onChange={event => setData({ ...data, initials: event.target.value })}
                    />
                    <Stack spacing={1} direction="row-reverse">
                        <Button
                            variant="contained"
                            onClick={submit}
                            disabled={data.initials.length === 0}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AF3899B