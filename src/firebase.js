import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAA8ZMCHP_PzSobtHOEUsxGAL3vQ_b2eUo",
    authDomain: "quora-clone-fe205.firebaseapp.com",
    projectId: "quora-clone-fe205",
    storageBucket: "quora-clone-fe205.appspot.com",
    messagingSenderId: "881988927292",
    appId: "1:881988927292:web:0c82f6cae459007d646839",
    measurementId: "G-ZNMTMDPQVD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()

  const provider = new firebase.auth.GoogleAuthProvider()

  const db = firebaseApp.firestore()

  export {auth,provider}

  export default db