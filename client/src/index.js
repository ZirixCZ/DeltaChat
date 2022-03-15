import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC92sUvA-C2N6ygsrOAlGy8GJDtv6sE3Lg",
  authDomain: "test-7f6fb.firebaseapp.com",
  projectId: "test-7f6fb",
  storageBucket: "test-7f6fb.appspot.com",
  messagingSenderId: "607050211175",
  appId: "1:607050211175:web:8998056543bc3aa577d9c2",
  measurementId: "G-TMVTCS52NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
