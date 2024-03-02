// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import ImageIcon from '@mui/icons-material/Image';
import FileOpenIcon from '@mui/icons-material/FileOpen'
import DeleteIcon from '@mui/icons-material/Delete';

// local storage
import { useLocalStorage } from 'usehooks-ts'

// custom
import ImageForm from '../../forms/img/ImageForm';

function ImageCard(props) {
    const {
        lastModified,
        dodid,
        index
    } = props

    const [open, setOpen] = React.useState(false)
    const [docs, setDocs] = useLocalStorage(`${dodid}-documents`, [])
    const doc = docs[index]
    
    function remove() {
        let tempDocs = [...docs]
        tempDocs.splice(index, 1)
        setDocs(tempDocs)
    }

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <CardHeader
                    avatar={<Avatar><ImageIcon fontSize="large" /></Avatar>}
                    title={doc.name}
                    subheader={lastModified}
                />
                <CardActions>
                    <Tooltip
                        title="Delete"
                    >
                        <IconButton
                            onClick={remove}
                        >
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{flexGrow: 1}} />
                    <Tooltip
                        title="View Image"
                    >
                        <IconButton
                            onClick={() => setOpen(true)}
                        >
                            <FileOpenIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <ImageForm
                open={open}
                close={() => setOpen(false)}
                doc={doc}
            />
        </Grid>
    )
}

export default ImageCard