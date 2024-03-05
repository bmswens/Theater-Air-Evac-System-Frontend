// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import SyncIcon from '@mui/icons-material/Sync';
import SideDrawer from './SideDrawer'

// router
import { Link, useLocation } from 'react-router-dom'
import SettingsDialog from '../components/SettingsDialog'
import SyncDialog from '../components/SyncDialog';

function Nav(props) {

    const [open, setOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [syncOpen, setSyncOpen] = React.useState(false)
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
                        title="Sync"
                    >
                        <IconButton
                            onClick={() => setSyncOpen(true)}
                        >
                            <SyncIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Settings"
                    >
                        <IconButton
                            onClick={() => setSettingsOpen(true)}
                        >
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
        <SettingsDialog
            open={settingsOpen}
            close={() => setSettingsOpen(false)}
        />
        <SyncDialog
            open={syncOpen}
            close={() => setSyncOpen(false)}
        />
        </>
    )
}

export default Nav