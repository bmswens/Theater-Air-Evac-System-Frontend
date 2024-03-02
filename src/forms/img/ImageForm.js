// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from '@mui/material'
import React from 'react'

// MUI Icons
import UploadIcon from '@mui/icons-material/Upload';
import { useLocalStorage } from 'usehooks-ts';


function SneakyInput(props) {

    const { onChange } = props

    return (
        <input
            onChange={onChange}
            style={{ display: "none"}}
            type="file"
            id="file-upload"
        />
    )
}


function ImageForm(props) {
    const {
        open,
        close,
        dodid,
        doc
    } = props

    const [imgURL, setImgURL] = React.useState(doc?.imgURL || null)
    const [name, setName] = React.useState(doc?.name || '')
    const [docs, setDocs] = useLocalStorage(`${dodid}-documents`, [])

    function handleFile(event) {
        let reader = new FileReader()
        let file = event.target.files[0]
        reader.onloadend = () => setImgURL(reader.result)
        reader.readAsDataURL(file)
    }

    function handleClose() {
        if (!doc) {
            setImgURL(null)
            setName('')
        }
        close()
    }

    function submit() {
        setDocs([...docs, { name, imgURL, lastModified: new Date() }])
        handleClose()
    }

    function handleClick() {
        let element = document.getElementById('file-upload')
        element.click()
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
                Upload Image
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <TextField
                                label="File Name"
                                fullWidth
                                disabled={Boolean(doc)}
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                startIcon={<UploadIcon />}
                                disabled={Boolean(doc)}
                                size='large'
                                fullWidth
                                sx={{
                                    height: "100%"
                                }}
                                onClick={handleClick}
                            >
                                Upload File
                                <SneakyInput onChange={handleFile} />
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        imgURL ?
                            <img
                                src={imgURL}
                                alt={name}
                            />
                            :
                            null
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
                {
                    doc ?
                        null :
                        <Button
                            variant="contained"
                            onClick={submit}
                            disabled={!imgURL || !name}
                        >
                            Submit
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default ImageForm