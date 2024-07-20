// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyr3FDuyUcF5XfdrQZVnAz7sTPOUjiLYA",
  authDomain: "saposoideiastore.firebaseapp.com",
  projectId: "saposoideiastore",
  storageBucket: "saposoideiastore.appspot.com",
  messagingSenderId: "979720817180",
  appId: "1:979720817180:web:e2e7687761e634f7266dd9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp) // isso cria o serviço de autenticação firebase.

export { firebaseAuth, firebaseApp }