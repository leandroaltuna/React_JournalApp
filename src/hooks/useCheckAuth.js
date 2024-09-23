import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase';
import { login, logout } from '../store/auth';


export const useCheckAuth = () => {
    
    const { status } = useSelector( state => state.authStore );
    const dispatch = useDispatch();

    useEffect(() => {
    
        //* El useEffect no necesita una dependencia [] porque el metodo onAuthStateChanged se encarga de escuchar los cambios en el "user". el useEffect solo se ejecuta una vez al montar el componente y luego el listener hace su trabajo sin que tengas que depender de otras variables.
        onAuthStateChanged( FirebaseAuth, async ( user ) => {

            if ( !user ) return dispatch( logout() );

            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );

        });
    
    }, []);

    return status;

}