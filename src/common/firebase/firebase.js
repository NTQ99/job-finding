import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from "./config";

const base = firebase.initializeApp(firebaseConfig);

export default base;