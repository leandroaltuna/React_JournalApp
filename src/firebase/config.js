// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
} = getEnvironments();


// Your web app's Firebase configuration
//* Dev/Prod
// const firebaseConfig = {
    // apiKey: "AIzaSyDKryIoA4GbNZJ2KjXoytI4MHt-t0VSXy8",
    // authDomain: "react-cursos-b9dc6.firebaseapp.com",
    // projectId: "react-cursos-b9dc6",
    // storageBucket: "react-cursos-b9dc6.appspot.com",
    // messagingSenderId: "800500293153",
    // appId: "1:800500293153:web:71d4ce4153ce10711d0d60"
// };

//* Testing
// const firebaseConfig = {
//     apiKey: "AIzaSyCBKJ0AmUzlCqLqLO4eRdV5wRu5_hZvH0o",
//     authDomain: "react-pruebas-e39cf.firebaseapp.com",
//     projectId: "react-pruebas-e39cf",
//     storageBucket: "react-pruebas-e39cf.appspot.com",
//     messagingSenderId: "350924122866",
//     appId: "1:350924122866:web:278adf5ce3c650e73abe6b"
// };

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
};
// console.log( firebaseConfig );

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );