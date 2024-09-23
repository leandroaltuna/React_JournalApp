// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKryIoA4GbNZJ2KjXoytI4MHt-t0VSXy8",
    authDomain: "react-cursos-b9dc6.firebaseapp.com",
    projectId: "react-cursos-b9dc6",
    storageBucket: "react-cursos-b9dc6.appspot.com",
    messagingSenderId: "800500293153",
    appId: "1:800500293153:web:71d4ce4153ce10711d0d60"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );