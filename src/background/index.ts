// background
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBOeQpbtTSyJD2MXmdESet6KI4ndyeaJJ0",
    authDomain: "extension-9799f.firebaseapp.com",
    projectId: "extension-9799f",
    storageBucket: "extension-9799f.appspot.com",
    messagingSenderId: "637101078493",
    appId: "1:637101078493:web:a58e466b7e68131ab4a834"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
