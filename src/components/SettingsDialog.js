// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

function SettingsDialog(props) {
    const {open, close} = props
    const [api, setApi] = useLocalStorage('api', '')

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                Settings
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <TextField
                        label="API URL"
                        fullWidth
                        helperText="Only set this is this device will be constantly connected."
                        value={api}
                        onChange={(event) => setApi(event.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SettingsDialog