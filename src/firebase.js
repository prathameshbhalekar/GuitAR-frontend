import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjMeNAr35XlY9pqqgp5j9ZsO_AlQ9gquc",
    authDomain: "mydevice-186508.firebaseapp.com",
    projectId: "mydevice-186508",
    storageBucket: "mydevice-186508.appspot.com",
    messagingSenderId: "139186884048",
    appId: "1:139186884048:web:fac91f38553e6d9f233dd5",
    measurementId: "G-JCPWDVS8J1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig) 

const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth()

export {auth, provider}
