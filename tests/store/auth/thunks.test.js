import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock( '../../../src/firebase/providers' );


describe( 'Pruebas en auth/thunks', () => { 
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test( 'checkingAuthentication debe de invocar el checkingCredentials', async () => { 
        
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });

    test( 'startGoogleSignIn debe de llamar el checkingCredentials and Login - Exito', async () => { 
        
        const loginData = { ok: true, ...demoUser };
        
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

        
    });
   
    test( 'startGoogleSignIn debe de llamar el checkingCredentials and Logout - Error', async () => { 
        
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );

    });

    test( 'startCreatingUserWithEmailPassword debe de llamar checkingCredentials, registerUserWithEmailPassword y login - Exito ', async () => { 
        
        const userData = { ok: true, ...demoUser };
        const formData = { password: '1234567', ...demoUser };

        await registerUserWithEmailPassword.mockResolvedValue( userData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
        
    });

    test( 'startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error ', async () => { 
        
        // const userData = { ok: false, uid: demoUser.uid, photoURL: demoUser.photoURL, errorMessage: 'Error al registrarse' };
        const userData = { ok: false, errorMessage: 'Error al registrarse' };
        const formData = { password: '1234567', ...demoUser };

        await registerUserWithEmailPassword.mockResolvedValue( userData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: userData.errorMessage }) );//? En pruebas usar la desestructuracion si los datos son exactamente iguales, caso contrario asignar solo los campos necesarios.
        
    });
    
    test( 'startLoginWithEmailPassword debe de llamar checkingCredentials and Login - Exito', async () => { 
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };
        
        // console.log( demoUser );

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
        
    });

    test( 'startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async () => { 
        
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    });

});