import firebase from "firebase";
import "firebase/analytics";

import { firebaseConfig } from "../config/firebaseConfig";

if (typeof window !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

  if (
    process.env.NODE_ENV === "production" &&
    "measurementId" in firebaseConfig
  ) {
    firebase.analytics();
  }
}

export default firebase;
