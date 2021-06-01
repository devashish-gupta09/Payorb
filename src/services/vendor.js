import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

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

// @protected
export const getVendorVerifiedDetails = async () => {
  try {
    const authHeader = await getAuthHeader();

    if (!authHeader) {
      throw new Error("No auth header found");
    }

    const res = await axios.get(
      `${API_URL}/${END_POINTS.VENDOR}/verifiedDetails`,
      {
        headers: authHeader,
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
