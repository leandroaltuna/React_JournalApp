import { useState, useEffect, useMemo } from 'react';


export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidated, setFormValidated ] = useState({});

    useEffect(() => {

        createValidations();
      
    }, [ formState ])

    const isFormValid = useMemo( () => {

        for ( const formField of Object.keys( formValidated ) ) {
            
            //* Valida si el valor es diferente de null. Si alguno de los campos es diferente de null quiere decir que algun campo del formulario no paso las validaciones.
            if ( formValidated[ formField ] !== null ) return false;

        };

        return true;

    }, [ formValidated ]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    //? Es un ejemplo
    // const formValidationsExample = {

    //     email: [ ( value ) => value.includes( '@' ), 'El correo debe tener un @' ],
    //     password: [ ( value ) => value.length >= 6, 'El password debe ser igual o mayor que 6 caracteres.' ],
    //     displayName: [ ( value ) => value.length >=1, 'El display name es obligatorio' ],
    
    // };

    const createValidations = () => {
        
        const formCheckedValues = {};

        //* formField es key del objeto, ex: email, password, displayName.
        for ( const formField of Object.keys( formValidations ) ) {

            //* Desestructura la funcion y el mensaje del array que viene dentro del objeto formValidations basado en el formField or key.
            const [ fn, errorMessage ] = formValidations[ formField ];

            //* Se le asigna al objeto un key con la combinacion del formField + Valid ( emailValid ).
            //* Se obtiene el valor del item a evaluar del formState y se ejecuta la funcion. Si la funcion retorna true entonces se le asigna null caso contrario se le asigna el errorMessage.
            formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;

        }

        //* lo asignamos al estado formValidated para que lo retorne.
        setFormValidated( formCheckedValues );

        // TODO: que acepte mas validaciones.
        // let indice = 0;
        // for ( const formField of Object.keys( formValidations ) ) {

        //     // console.log( formValidations[ formField ] );
        //     formValidations[ formField ].forEach( element => {
        //         console.log({ indice });
        //         console.log( element.validacion[ indice ], element.mensaje[ indice ] );
        //         indice++;
        //     });
            

            // const [ fn, errorMessage ] = formValidations[ formField ];

            // formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;

        // }

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        //* Retornamos los mensajes de la validacion de los campos del formulario.
        ...formValidated,
        isFormValid,
    }
}