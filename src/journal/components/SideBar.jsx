import TurnedInNot from '@mui/icons-material/TurnedInNot';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './';


export const SideBar = ({ drawerWith = 240 }) => {

    const { displayName } = useSelector( state => state.authStore );
    const { notes } = useSelector( state => state.journalStore );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWith }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWith }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        // [ 'Enero', 'Febrero', 'Marzo', 'Abril' ].map( text => (
                        notes.map( note => (
                            <SideBarItem key={ note.id } { ...note } />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )

}
