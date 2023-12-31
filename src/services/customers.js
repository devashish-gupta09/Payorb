import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const createCustomer = async (customer, eventLink) => {
  try {
    // const x = {
    //   headers: await getAuthHeader(),
    // };
    const res = await axios.post(
      `${API_URL}/${END_POINTS.CUSTOMER}`,
      { customer, eventLink }
      // x
    );

    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getCustomersForVendor = async () => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.CUSTOMER}`, {
      headers: await getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getCustomerForReview = async (eventId, customerId) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.CUSTOMER}`, {
      params: {
        eventId,
        customerId,
      },
    });

    console.log("RES", res);
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
