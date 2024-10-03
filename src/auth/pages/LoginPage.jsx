import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Google from '@mui/icons-material/Google';
import { AuthLayout } from '../layout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';


const formData = {
    email: '',
    password: '',
};

const formValidations = {

    email: [ ( value ) => value.includes( '@' ) && value.trim().length > 0, 'El correo debe tener un @ y es requerido' ],
    // TODO: que acepte mas validaciones
    // email: [
    //     {
    //         validacion: [ ( value ) => value.includes( '@' ), ( value ) => value.trim().length > 0, ],
    //         mensaje: ['El correo debe tener un @', 'El correo es requerido',  ],
    //     }
    // ],
    password: [ ( value ) => value.length >= 6, 'El password debe ser igual o mayor que 6 caracteres.' ],

};

export const LoginPage = () => {

    const {
        email, password, onInputChange, formState,
        emailValid, passwordValid, isFormValid,
    } = useForm( formData, formValidations );
    
    const { status, errorMessage } = useSelector( state => state.authStore );
    const isAuthenticating = useMemo( () => status === 'checking', [ status ] );
    const dispatch = useDispatch();
    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const onSubmit = ( event ) => {
        
        event.preventDefault();

        // console.log({ email, password });
        // dispatch( checkingAuthentication() );

        setFormSubmitted( true );

        if ( !isFormValid ) return;

        dispatch( startLoginWithEmailPassword( formState ) );

    }

    const onGoogleSignIn = () => {
        
        // console.log('google');

        dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title={ 'Login' }>
            <form aria-label="submit-form" onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__medium">
                <Grid>
                    {/* <Grid item xs={ 12 } sx={{ mt: 2 }}> */}
                    <Grid size={{ xs: 12 }}  sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" placeholder="correo@gmail.com" fullWidth
                            name="email" value={ email } onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted } helperText={ emailValid }
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth 
                            name="password" value={ password } onChange={ onInputChange } slotProps={{ htmlInput: { 'data-testid': 'password-id' } }}
                            error={ !!passwordValid && formSubmitted } helperText={ passwordValid }
                        />
                    </Grid>
                    
                    
                    <Grid container spacing={ 2 } sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12 }}  display={ !!errorMessage ? '' : 'none' }>
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} 
                        direction="row" justifyContent="center"
                    >
                        {/* <Grid item xs={ 12 } sm={ 6 }> */}
                        <Grid size="grow">
                            <Button type="submit" variant="contained" fullWidth
                                disabled={ isAuthenticating }
                            >
                                Login
                            </Button>
                        </Grid>
                        {/* <Grid item xs={ 12 } sm={ 6 }> */}
                        <Grid size="grow">
                            <Button variant="contained" fullWidth aria-label="google-btn"
                                onClick={ onGoogleSignIn } disabled={ isAuthenticating }
                            >
                                <Google />
                                <Typography sx={{ ml: 1, mr: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" >
                        <Link component={ RouterLink } color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
    
}
