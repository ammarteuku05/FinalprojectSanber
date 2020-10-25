import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyB-DN849WBLloHOsagh-xK-kAAzcts-L_w",
  authDomain: "finalprojectrn0820.firebaseapp.com",
  databaseURL: "https://finalprojectrn0820.firebaseio.com",
  projectId: "finalprojectrn0820",
  storageBucket: "finalprojectrn0820.appspot.com",
  messagingSenderId: "257272706004",
  appId: "1:257272706004:web:284b26401517dec9e35c41",
  measurementId: "G-4DB4L1EMKM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();

export default firebase;
