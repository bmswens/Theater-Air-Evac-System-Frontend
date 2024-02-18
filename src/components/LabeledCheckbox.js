// React
import React from 'react'

// MUI
import { Checkbox, FormControlLabel } from '@mui/material'

function LabeledCheckbox(props) {

    const {
        label,
        checked,
        onChange,
        disabled
    } = props

    return (
        <FormControlLabel control={<Checkbox onChange={onChange} checked={checked} disabled={disabled} />} label={label} />
    )
}

export default LabeledCheckbox