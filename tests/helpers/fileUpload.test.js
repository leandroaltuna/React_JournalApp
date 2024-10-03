import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    
    cloud_name: 'dbchkev7e',
    api_key: '263176586329272',
    api_secret: 'Ge4P2yPHOLQATCepdh_H9PKZGII',
    secure: true,

});


describe( 'Pruebas en fileUpload', () => { 
    
    test( 'Debe de subir el archivo correctamente a cloudinary', async () => { 
        
        const imageUrl = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );
        // console.log( url );

        const segments = url.split( '/' );
        const imageId = segments[ segments.length - 1 ].replace( '.jpg', '' );

        const cloudResp = await cloudinary.api.delete_resources([ imageId ], {
            resource_type: 'image'
        });

        // console.log( cloudResp );
        
    });

    test( 'Debe de retornar null', async () => { 
        
        const file = new File( [], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
        
    });
    
});