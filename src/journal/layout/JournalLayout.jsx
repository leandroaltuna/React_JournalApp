import Box from '@mui/material/Box';
import { NavBar, SideBar } from '../components';
import { Toolbar } from '@mui/material';


const drawerWith = 280;

export const JournalLayout = ({ children }) => {

    return (
        
        <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">

            <NavBar drawerWith={ drawerWith } />
            <SideBar drawerWith={ drawerWith } />
            
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 2.5 }}
            >
                <Toolbar />

                { children }

            </Box>

        </Box>

    )

}
