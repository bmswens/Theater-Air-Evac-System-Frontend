// React
import { Fab, Grid, Stack } from '@mui/material'
import React from 'react'


function ActionButton(props) {

    const {
        onClick
    } = props

    return (
        <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
                <Fab
                    color="primary"
                    onClick={onClick}
                >
                    {props.children}
                </Fab>
            </Stack>
        </Grid>
    )
}

export default ActionButton