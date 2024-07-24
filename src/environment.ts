// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFnq25xcEEb4J9MQAy2I7Jqui3bjJCSgY",
  authDomain: "arschiller-servisse.firebaseapp.com",
  databaseURL: "https://arschiller-servisse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arschiller-servisse",
  storageBucket: "arschiller-servisse.appspot.com",
  messagingSenderId: "261608255659",
  appId: "1:261608255659:web:5261995a64337462a707ee",
  measurementId: "G-NCN573N8PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);