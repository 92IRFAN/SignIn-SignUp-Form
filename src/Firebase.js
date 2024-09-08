// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGDVLClyGZbVtQ7kDdOBY-hEQBYKXWKlE",
  authDomain: "authentication-382a9.firebaseapp.com",
  projectId: "authentication-382a9",
  storageBucket: "authentication-382a9.appspot.com",
  messagingSenderId: "98512319423",
  appId: "1:98512319423:web:4c4f21fc45cc9edc69e70a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}