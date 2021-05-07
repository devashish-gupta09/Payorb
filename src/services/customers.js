import axios from "axios";
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const createCustomer = async (customer) => {
  try {
    const x = {
      headers: await getAuthHeader(),
    };
    const res = await axios.post(
      `${API_URL}/${END_POINTS.CUSTOMER}`,
      { customer },
      x
    );

    return res.data;
  } catch (err) {
    console.log("In Customer", err);
    throw err.response.data || err.message;
  }
};