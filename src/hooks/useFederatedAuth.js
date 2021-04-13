import { FirebaseAuth } from "../components/AuthenticationContext";
import { AUTH_PROVIDERS } from "../constants/auth";

function useFederatedAuth() {
  const firebaseAuth = FirebaseAuth.Singleton();

  const googleSignIn = async () => {
    try {
      const userInfo = await firebaseAuth.googleSignin();
      const idToken = await firebaseAuth.getIdToken();
      return { userInfo, idToken };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const facebookSignIn = async () => {
    try {
      const userInfo = await firebaseAuth.facebookSignin();
      const idToken = await firebaseAuth.getIddToken();
      return { userInfo, idToken };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fedSignUp = async (provider) => {
    switch (provider) {
      case AUTH_PROVIDERS.GOOGLE:
        return await googleSignIn();
      case AUTH_PROVIDERS.FACEBOOK:
        return await facebookSignIn();
      default:
        return;
    }
  };

  return { fedSignUp };
}

export default useFederatedAuth;
