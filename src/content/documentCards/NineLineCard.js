// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import DeleteIcon from '@mui/icons-material/Delete';

// custom
import NineLineForm from '../../forms/9line/NineLineForm';
import useStorage from '../../api/useStorage';

function NineLineCard(props) {
    const {
        lastModified,
        dodid,
        index
    } = props

    const [open, setOpen] = React.useState(false)
    const [docs, setDocs] = useStorage(`${dodid}-documents`, [])
    const doc = docs[index]
    
    function remove() {
        let tempDocs = [...docs]
        tempDocs.splice(index, 1)
        setDocs(tempDocs)
    }

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardHeader
                    avatar={<Avatar><DescriptionIcon fontSize="large" /></Avatar>}
                    title="9 Line"
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
                        title="View Document"
                    >
                        <IconButton
                            onClick={() => setOpen(true)}
                        >
                            <FileOpenIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <NineLineForm
                open={open}
                close={() => setOpen(false)}
                doc={doc}
            />
        </Grid>
    )
}

export default NineLineCard