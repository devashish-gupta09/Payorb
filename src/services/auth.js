import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";

export const addUser = async (userDetails, idToken) => {
  console.log(userDetails);
  const res = await axios.post(`${API_URL}/${END_POINTS.SIGNUP}`, userDetails, {
    headers: {
      authorization: idToken,
    },
  });

  return res;
};
