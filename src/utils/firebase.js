import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

console.log("What ????");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore();

export default firebase;
