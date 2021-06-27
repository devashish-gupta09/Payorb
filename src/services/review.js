import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const addReview = async (review) => {
  try {
    const res = await axios.post(`${API_URL}/${END_POINTS.REVIEW}`, { review });

    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getReviewsForVendor = async (params) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.REVIEW}`, {
      headers: await getAuthHeader(),
      params,
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
