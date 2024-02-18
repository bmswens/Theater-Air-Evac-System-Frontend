// React
import React from 'react'

// MUI
import { Autocomplete, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'


function SelectFormDialog(props) {

    const { open, close, setForm } = props


    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle align="center">
                Select Form
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <Autocomplete
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Form" />}
                        options={[
                            "Tactical Casualty Care Card",
                            "9 Line",
                            "AF Form 3899",
                            "AF Form 3899A",
                            "AF Form 3899D",
                            "AF Form 3899I"
                        ]}
                        onChange={(_, value) => {
                            setForm(value)
                            close()
                        }}
                    />
                </Stack>
            </DialogContent>
        </Dialog>
    )



}

export default SelectFormDialog