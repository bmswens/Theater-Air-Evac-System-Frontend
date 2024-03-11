// React
import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const blankEntry = {
    datetime: new Date(),
    hr: '',
    rr: '',
    temp: '',
    map: '',
    art: '',
    cvp: '',
    sao2: '',
    rythem: '',
    icp: ''
}

function EntryTable(props) {
    const { rows } = props
    const columns = Object.keys(blankEntry).map(key => {
        return {
            field: key,
            headerName: key,
            flex: 1
        }
    })

    const finalRows = rows.map((row, index) => {return {...row, id: index}})

    return (
        <Box sx={{ width: "100%", height: 400}}>
            <DataGrid
                columns={columns}
                rows={finalRows}
                slots={{ toolbar: GridToolbar}}
            />
        </Box>
    )

}

function AF3899D(props) {

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
                AF Form 3899D
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <EntryTable
                        rows={entries}
                    />
                    <Divider>
                        New Entry
                    </Divider>
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
                                            onChange={event => setData({...data, [key]: event.target.value})}
                                        />
                                    )
                                }
                                return null
                            })
                        }
                    </Stack>
                    <Stack spacing={1} direction="row-reverse">
                        <Button
                            variant="contained"
                            onClick={submit}
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

export default AF3899D