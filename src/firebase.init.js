// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVvAbYNtQquSirmX730qk5KwhHS5U8QG0",
  authDomain: "genius-car-services-5b346.firebaseapp.com",
  projectId: "genius-car-services-5b346",
  storageBucket: "genius-car-services-5b346.appspot.com",
  messagingSenderId: "1219455500",
  appId: "1:1219455500:web:1d87fece181bf9de215c29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;