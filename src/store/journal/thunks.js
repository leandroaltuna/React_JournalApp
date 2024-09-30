import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, isSavingNewNote, noteUpdated, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from './journalSlice';


export const startNewNote = () => {
    
    return async ( dispatch, getState ) => {
        
        dispatch( isSavingNewNote() );

        const { uid } = getState().authStore;

        const newNote = {
            title: 'Prueba',
            body: 'Hola body',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        // const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }

}

export const startLoadingNotes = () => {
    
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().authStore;
        if ( !uid ) throw new Error( 'El UID del usuario no existe' );

        const notes = await loadNotes( uid );
        // console.log( notes );
        dispatch( setNotes( notes ) );

    }

}

export const startSaveNote = () => {
    
    return async ( dispatch, getState ) => {

        dispatch( setSaving() );
        
        const { uid } = getState().authStore;
        const { active: activeNote } = getState().journalStore;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        // console.log( noteToFireStore );
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( noteUpdated( activeNote ) );

    }

}

export const startUploadingFiles = ( files = [] ) => {
    
    return async ( dispatch ) => {
        
        dispatch( setSaving() );
        // console.log( files );
        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );
        };

        const photoUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photoUrls ) );

    }

}

export const startDeletingNote = () => {
    
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().authStore;
        const { active: activeNote } = getState().journalStore;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( activeNote.id ) );

    }
   
}