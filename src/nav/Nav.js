// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SettingsIcon from '@mui/icons-material/Settings'
import SideDrawer from './SideDrawer'

// router
import { Link, useLocation } from 'react-router-dom'

function Nav(props) {

    const [open, setOpen] = React.useState(false)
    const location = useLocation()

    React.useEffect(() => {
        setOpen(false)
    }, [location])

    return (
        <>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                    <Link to="/" style={{color: "inherit", textDecoration: "none" }}>
                        <Typography variant="h6">
                            TAES
                        </Typography>
                    </Link>
                    <Box sx={{flexGrow: 1}} />
                    <Tooltip
                        title="QR Scanner"
                    >
                        <IconButton>
                            <QrCodeScannerIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Settings"
                    >
                        <IconButton>
                            <SettingsIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
        <SideDrawer
            open={open}
            close={() => setOpen(false)}
        />
        </>
    )
}

export default Nav