import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase';
import { addNewEmptyNote, isSavingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';


describe( 'Pruebas en Journal/Thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test( 'startNewNote debe de crear una nueva nota en blanco', async () => { 
        
        const uid = 'TestID';
        
        getState.mockReturnValue({ authStore: { uid: uid } });
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( isSavingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote(
            {
                body: '',
                date: expect.any( Number ),
                id: expect.any( String ),
                title: '',
            })
        );
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote(
            {
                body: '',
                date: expect.any( Number ),
                id: expect.any( String ),
                title: '',
            })
        );

        //* Elimina datos de la bd en testing project.
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionRef );
        const deletePromises = [];

        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );
        
    });
    
});