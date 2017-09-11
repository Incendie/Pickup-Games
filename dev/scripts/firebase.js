import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIl9MXGs-eqVE62NfRMW5OPTCBppZ8ieE",
  authDomain: "pickup-games-1504815516819.firebaseapp.com",
  databaseURL: "https://pickup-games-1504815516819.firebaseio.com",
  projectId: "pickup-games-1504815516819",
  storageBucket: "pickup-games-1504815516819.appspot.com",
  messagingSenderId: "123594277206"
};
firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();