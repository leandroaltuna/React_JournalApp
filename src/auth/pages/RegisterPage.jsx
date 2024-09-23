import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidations = {

    email: [ ( value ) => value.includes( '@' ), 'El correo debe tener un @' ],
    password: [ ( value ) => value.length >= 6, 'El password debe ser igual o mayor que 6 caracteres.' ],
    displayName: [ ( value ) => value.length >=1, 'El display name es obligatorio' ],

};

export const RegisterPage = () => {
    
    const { 
        displayName, email, password, onInputChange, formState,
        displayNameValid, emailValid, passwordValid, isFormValid,

    } = useForm( formData, formValidations );

    const { status, errorMessage } = useSelector( state => state.authStore );
    const isAuthenticating = useMemo( () => status === 'checking', [ status ] );
    const dispatch = useDispatch();
    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const onSubmit = ( event ) => {
        
        event.preventDefault();
        setFormSubmitted( true );

        if ( !isFormValid ) return;
     
        dispatch( startCreatingUserWithEmailPassword( formState ) );

    }

    return (
        <AuthLayout title={ 'Register' }>

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Nombre Completo" type="text" placeholder="John Doe" fullWidth
                            name="displayName" value={ displayName } onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted } helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" placeholder="correo@gmail.com" fullWidth 
                            name="email" value={ email } onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted } helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth 
                            name="password" value={ password } onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted } helperText={ passwordValid }
                        />
                    </Grid>
                    
                    
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        
                        <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button type="submit" variant="contained" fullWidth
                                disabled={ isAuthenticating }
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end" >
                        <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
                        <Link component={ RouterLink } color="inherit" to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
    
}