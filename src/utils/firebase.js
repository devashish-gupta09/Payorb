import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
