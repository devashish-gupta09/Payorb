import app from "../../utils/firebase";
import React from "react";

export class FirebaseAuth {
  firebaseInstance;

  constructor() {
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  static Singleton() {
    if (this.firebaseInstance === undefined) {
      this.firebaseInstance = new FirebaseAuth();
      return this.firebaseInstance;
    }
    return this.firebaseInstance;
  }

  // Handle Google Signin
  async googleSignin() {
    return await app.auth().signInWithPopup(this.googleProvider);
  }

  // Handle Facebook Signin
  async facebookSignin() {
    return await app.auth().signInWithPopup(this.facebookProvider);
  }

  async getIdToken() {
    return await app.auth().currentUser.getIdToken();
  }

  async signOut() {
    await app.auth().signOut();
  }

  getUser() {
    return app.auth().currentUser;
  }
}

export const Context = React.createContext(null);

const AuthenticationContext = (props) => {
  const { children } = props;
  const [user, setUser] = React.useState(null);

  const handleAuthChange = async (newUser) => {
    if (newUser) {
      setUser(newUser);
    }
  };

  let authObserver;

  React.useEffect(() => {
    authObserver = app.auth().onAuthStateChanged((authenticatedUser) => {
      console.log("Did we observe an auth change", authenticatedUser);
      handleAuthChange(authenticatedUser);
    });

    return () => {
      if (authObserver) {
        console.log("Component Unmount Function");
        authObserver();
      }
    };
  }, [user]);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export default AuthenticationContext;
