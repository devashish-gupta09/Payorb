import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";

export const getVendorPublic = async (userUID) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.VENDOR}`, {
      params: {
        userUID,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
