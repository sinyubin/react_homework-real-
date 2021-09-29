import firebase from "firebase/app";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUeObGoH5NGW2pElZmV5EP4mAj08rWhwI",
  authDomain: "reacthomwork.firebaseapp.com",
  projectId: "reacthomwork",
  storageBucket: "reacthomwork.appspot.com",
  messagingSenderId: "612278302112",
  appId: "1:612278302112:web:2b8da89f0cb70f3b6620c5",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
