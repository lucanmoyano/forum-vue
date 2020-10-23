import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

let config = {
    apiKey: "AIzaSyDiRI1UCeA_DNhg3qv0_oojPAU-pQCXbCI",
    authDomain: "proyectoforo-93da5.firebaseapp.com",
    databaseURL: "https://proyectoforo-93da5.firebaseio.com",
    projectId: "proyectoforo-93da5",
    storageBucket: "proyectoforo-93da5.appspot.com",
    messagingSenderId: "873494096546",
    appId: "1:873494096546:web:dd714484ed862b4ce985fb",
    measurementId: "G-XEQ05KC9YB"
}

const fb = firebase.initializeApp(config);
const db = firebase.firestore();

db.ref('temas');

export { fb, db }