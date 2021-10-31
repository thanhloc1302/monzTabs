import * as firebase from "firebase";
import "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAjgZYwHl6JIUu1Km9NBB5SSSxrYY943xA",
  authDomain: "monfit-b0688.firebaseapp.com",
  databaseURL:
    "https://monfit-b0688-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "monfit-b0688",
  storageBucket: "monfit-b0688.appspot.com",
  messagingSenderId: "527881232791",
  appId: "1:527881232791:web:6aa70ec0b33a02123f24d2",
  measurementId: "G-VVMPR9VB9R",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {}
export default firebase;
