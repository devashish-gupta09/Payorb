import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";

export const addUser = async (userDetails, idToken) => {
  const res = await axios.post(`${API_URL}/${END_POINTS.VENDOR}`, userDetails, {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });

  return res;
};
