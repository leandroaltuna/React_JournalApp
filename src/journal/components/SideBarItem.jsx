import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


export const SideBarItem = ({ id, title, body, date, imageUrls =[] }) => {

    const titleFormatted = useMemo(() => {

        return ( title.length > 17 )
                ? title.substring( 0, 17) + '...'
                : title;

    }, [ title ]);

    const dispatch = useDispatch();
    const onClickNote = () => {
        
        const noteObj = {
            id, title, body, date, imageUrls,
        };

        dispatch( setActiveNote( noteObj ) );

    }

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={ onClickNote }>
                    
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>

                    <Grid container>
                        <ListItemText primary={ titleFormatted } />
                        <ListItemText secondary={ body } />
                    </Grid>
                    
                </ListItemButton>
            </ListItem>
        </>
    )

}