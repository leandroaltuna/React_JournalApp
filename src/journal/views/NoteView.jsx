import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import { Button, Grid, Grid2, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, UploadFileOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';


export const NoteView = () => {
    
    const dispatch = useDispatch();
    const { active: activeNote, saveMessage, isSaving } = useSelector( state => state.journalStore );
    const { id, title, body, date, onInputChange, formState } = useForm( activeNote );

    const dateFormatted = useMemo(() => {

        const dateString = new Date( date );
        return dateString.toUTCString();

    }, [ date ])

    const fileInputRef = useRef();

    useEffect(() => {

        dispatch( setActiveNote( formState ) );

    }, [ formState ]);

    useEffect(() => {
        
        if ( saveMessage.length > 0 ) {
            Swal.fire( 'Note Updated', saveMessage, 'success' );
        }

    }, [ saveMessage ]);
    
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {

        // console.log( target.files );
        if ( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );

    };

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            
            <Grid item>
                <Typography fontSize={ 39 } fontWeight="light">{ dateFormatted }</Typography>
            </Grid>
            <Grid item>
                <input type="file" multiple style={{ display: 'none' }}
                    onChange={ onFileInputChange } ref={ fileInputRef }
                />
                <IconButton color="primary" 
                    disabled={ isSaving } onClick={ () => fileInputRef.current.click() }
                >
                    <UploadFileOutlined />
                </IconButton>
                <Button color="primary" sx={{ padding: 2 }}
                    onClick={ onSaveNote } disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia de hoy"
                    sx={{ border: 'none', mb: 1 }}
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid2 container justifyContent="end">
                <Button sx={{ mt: 2 }} color="error"
                    onClick={ onDelete }
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid2>

            <ImageGallery images={ activeNote.imageUrls } />

        </Grid>
    )

}
