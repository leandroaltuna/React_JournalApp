import { Provider, useDispatch } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock( '../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock( 'react-redux', () => ({
    ...jest.requireActual( 'react-redux' ),
    //* Es una funcion de flecha que va a llamar a otra funcion que recibe una funcion como parametro, y esta va a ejecutar una funcion.
    useDispatch: () => (fn) => fn(),
}) );


const storeTest = configureStore({
    reducer: {
        authStore: authSlice.reducer
    },
    //* Sirve para cargar el state del reducer. En el caso del google btn, sirve para pasar un status de not-aunthenticated y asi el boton se deshabilite.
    preloadedState: {
        authStore: notAuthenticatedState
    }
});

describe( 'Pruebas en el <LoginPage />', () => { 
    
    test( 'Debe de mostrar el componente correctamente', () => { 
        
        render(
            <Provider store={ storeTest }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText( 'Login' ).length ).toBeGreaterThanOrEqual( 1 );
        
    });

    test( 'Boton de Google debe llamar el startGoogleSignIn', () => { 
        
        render(
            <Provider store={ storeTest }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText( 'google-btn' );
        fireEvent.click( googleBtn );
        
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test( 'Submit debe de llamar startLoginWithEmailPassword', () => { 
        
        const emailValue = 'testing@google.com';
        const passwordValue = '123456';

        render(
            <Provider store={ storeTest }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug();
        const emailField = screen.getByRole( 'textbox', { name: 'Correo' } );
        fireEvent.change( emailField, { target: { name: 'email', value: emailValue } } );
        
        const passwordField = screen.getByTestId( 'password-id' );
        fireEvent.change( passwordField, { target: { name: 'password', value: passwordValue } } );
        
        const loginForm = screen.getByLabelText( 'submit-form' );
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({ email: emailValue, password: passwordValue });
        
    });
    
});