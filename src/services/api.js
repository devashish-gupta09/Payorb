import { FirebaseAuth } from "../components/AuthenticationContext";

export const getAuthHeader = async () => {
  try {
    const idToken = await FirebaseAuth.Singleton().getIdToken();
    return {
      authorization: `Bearer ${idToken}`,
    };
  } catch (err) {
    return;
  }
};
