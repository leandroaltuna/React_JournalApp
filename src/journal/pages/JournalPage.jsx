import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../views';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { isSavingNewNote, startNewNote } from '../../store/journal';


export const JournalPage = () => {
    

    const dispacth = useDispatch();
    const { isSaving, active } = useSelector( state => state.journalStore );

    const onClickNewNote = () => {
        dispacth( startNewNote() );
    }

    return (
        <JournalLayout>

            {
                ( !!active )
                ? <NoteView />
                : <NothingSelectedView />
            }

            <IconButton
                onClick={ onClickNewNote }
                disabled={ isSaving }
                size="medium"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 25 }} />
            </IconButton>
        </JournalLayout>
    )
    
}
