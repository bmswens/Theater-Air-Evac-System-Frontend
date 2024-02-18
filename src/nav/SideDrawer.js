// React
import React from 'react'

// MUI
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// MUI icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Link } from 'react-router-dom'

function SideDrawer(props) {
    const {open, close} = props

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={close}
            sx={{
                width: 240,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List>
                <ListItem disablePadding>
                    <Link to="/patients" style={{color: "inherit", textDecoration: "none", width: "100%"}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Patients" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideDrawer