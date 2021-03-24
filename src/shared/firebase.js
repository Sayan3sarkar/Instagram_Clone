import firebase from 'firebase';

const firebaseConfig = {
    apiKey: '**', // Replace with Own Firebase project API key
    authDomain: "instagram-clone-e4541.firebaseapp.com",
    projectId: "instagram-clone-e4541",
    storageBucket: "instagram-clone-e4541.appspot.com",
    messagingSenderId: "",
    appId: "1:122337461666:web:14bdcc632a674234511efb"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();