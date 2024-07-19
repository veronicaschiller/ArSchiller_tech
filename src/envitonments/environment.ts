// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
    firebase:{
        apiKey: "AIzaSyCFnq25xcEEb4J9MQAy2I7Jqui3bjJCSgY",
  authDomain: "arschiller-servisse.firebaseapp.com",
  databaseURL: "https://arschiller-servisse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arschiller-servisse",
  storageBucket: "arschiller-servisse.appspot.com",
  messagingSenderId: "261608255659",
  appId: "1:261608255659:web:5261995a64337462a707ee",
  measurementId: "G-NCN573N8PQ"}
    }

// Initialize Firebase
const app = initializeApp(environment.firebase);

// Initialize Firestore
const dbFirebase = getFirestore(app);

export { dbFirebase };