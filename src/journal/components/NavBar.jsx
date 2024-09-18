import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import { Grid, Typography } from '@mui/material';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';


export const NavBar = ({ drawerWith = 240 }) => {

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc( 100% - ${ drawerWith }px )` },
                ml: { sm: `${ drawerWith }px` }
            }}
        >
            <Toolbar>
                
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    
                    <Typography variant="h6" noWrap component="div">
                        Journal App
                    </Typography>

                    <IconButton color="error">
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )

}
