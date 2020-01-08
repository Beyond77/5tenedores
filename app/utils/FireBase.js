import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDzIgHOH9u5xdLIOHKkbWN2gVswi0V3T2Q",
    authDomain: "tenedores-f47dd.firebaseapp.com",
    databaseURL: "https://tenedores-f47dd.firebaseio.com",
    projectId: "tenedores-f47dd",
    storageBucket: "tenedores-f47dd.appspot.com",
    messagingSenderId: "509784468081",
    appId: "1:509784468081:web:de79d559da96d8db0809d0"
  };
  
  export const firebaseApp = firebase.initializeApp(firebaseConfig);  