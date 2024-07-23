// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBTHXjum0MG--AsAoXo4A3fLFn4e-kID3Y",
        authDomain: "ar-tech-schiller.firebaseapp.com",
        projectId: "ar-tech-schiller",
        storageBucket: "ar-tech-schiller.appspot.com",
        messagingSenderId: "384990249191",
        appId: "1:384990249191:web:c8e5b06137bbd726d52242",
        measurementId: "G-ZZ8BCP7ZB0"
    }
    }

// Initialize Firebase
const app = initializeApp(environment.firebase);

// Initialize Firestore
const dbFirebase = getFirestore(app);

export { dbFirebase };