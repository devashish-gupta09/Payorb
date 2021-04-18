import axios from "axios";
import { FirebaseAuth } from "../components/AuthenticationContext";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const addUser = async (userDetails) => {
  const res = await axios.post(`${API_URL}/${END_POINTS.VENDOR}`, userDetails, {
    headers: await getAuthHeader(),
  });
  return res.data;
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/${END_POINTS.VENDOR}`, {
      headers: await getAuthHeader(),
    });
    return response.data;
  } catch (err) {
    return {};
  }
};

export const updateUser = () => {
  const res = await axios.patch(`${API_URL}/${END_POINTS.VENDOR}`, userDetails, {
    headers: await getAuthHeader(),
  });
  return res.data;
}