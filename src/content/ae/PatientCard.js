// React
import React from 'react'

// MUI
import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import FolderIcon from '@mui/icons-material/Folder'


import useStorage from '../../api/useStorage'
import TCCC from '../../forms/tccc/TCCC'
import { useNavigate } from 'react-router-dom'

function PatientCard(props) {
    const {
        firstName,
        lastName,
        dodid
    } = props

    const [docs] = useStorage(`${dodid}-documents`, [])
    const navigate = useNavigate()
    
    let tccc = null
    let af3899 = null
    for (let doc of docs) {
        if (doc.name === "Tactical Casualty Care Card") {
            tccc = doc
        }
    }

    const [tcccOpen, setTccOpen] = React.useState(false)

    function close() {
        setTccOpen(false)
    }
    
    return (
        <Grid item xs={12}>
            <Card>
                <CardActionArea
                    aria-label={`Open ${dodid}`}
                    onClick={() => navigate(`/patients/${dodid}`)}
                >
                    <CardHeader
                        title={`${firstName} ${lastName}`}
                        titleTypographyProps={{ variant: "h6" }}
                        subheader={dodid}
                        avatar={<Avatar><FolderIcon /></Avatar>}
                    />
                </CardActionArea>
                <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            onClick={() => setTccOpen(true)}
                            disabled={tccc === null}
                        >
                            TCCC
                        </Button>
                        <Button
                            variant="contained"
                            disabled={af3899 === null}
                        >
                            Vitals
                        </Button>
                        <Button
                            variant="contained"
                            disabled
                        >
                            ISBAR
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
            {
                tccc ?
                    <TCCC
                        open={tcccOpen}
                        close={close}
                        data={tccc.data}
                    />
                    :
                    null
            }

        </Grid>
    )
}

export default PatientCard