import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const addUser = async (userDetails) => {
  const authHeader = await getAuthHeader();

  if (!authHeader) {
    console.log("No auth header found");
  }

  const res = await axios.post(`${API_URL}/${END_POINTS.VENDOR}`, userDetails, {
    headers: authHeader,
  });

  return res.data;
};

export const getUser = async (vendorId) => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.get(`${API_URL}/${END_POINTS.VENDOR}`, {
      headers: authHeader,
      params: {
        vendorId,
      },
    });
    return response.data;
  } catch (err) {
    return err.response || err;
  }
};

export const updateUser = async (userDetails) => {
  try {
    const authHeader = await getAuthHeader();

    if (!authHeader) {
      throw new Error("No auth header found");
    }
    const res = await axios.patch(
      `${API_URL}/${END_POINTS.VENDOR}`,
      userDetails,
      {
        headers: authHeader,
      }
    );
    return res.data;
  } catch (err) {
    return err.response || err;
  }
};
