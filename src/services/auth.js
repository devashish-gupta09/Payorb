import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";

export const signUp = async ({
  username,
  password,
  phoneNumber,
  email,
  name,
}) => {
  try {
    console.log("This is going to be legendary");
    return "";
  } catch (error) {
    console.log("Error signing up", error);
  }
};

export const addUser = async (userDetails, idToken) => {
  const res = await axios.post(`${API_URL}/${END_POINTS.SIGNUP}`, userDetails, {
    headers: {
      authorization: idToken,
    },
  });

  return res;
};
