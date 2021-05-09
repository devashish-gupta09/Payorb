import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const getEventStats = async (params) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.STATS}/events`, {
      headers: await getAuthHeader(),
      params,
    });

    return res.data;
  } catch (err) {
    console.log("In Customer", err);
    throw err.response.data || err.message;
  }
};
