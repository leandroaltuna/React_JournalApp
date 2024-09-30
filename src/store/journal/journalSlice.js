import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12838,
        //     imageUrls: [],
        // }
    },
    reducers: {
        isSavingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {

            state.notes.push( action.payload );
            state.isSaving = false;

        },
        setActiveNote: ( state, action ) => {
            
            state.active = action.payload;
            state.saveMessage = '';

        },
        setNotes: ( state, action ) => {
            
            state.notes = action.payload;

        },
        setSaving: ( state ) => {

            state.isSaving = true;
            state.saveMessage = '';

        },
        noteUpdated: ( state, action ) => {
            
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id )
                {
                    state.saveMessage = `Nota: ${ note.title } fue actualizada correctamente`;
                    return action.payload;
                }

                return note;

            });

        },
        setPhotosToActiveNote: ( state, action ) => {
            
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;

        },
        clearNotesLogout: ( state ) => {
            
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.active = null;

        },
        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    isSavingNewNote,
    noteUpdated,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
} = journalSlice.actions;