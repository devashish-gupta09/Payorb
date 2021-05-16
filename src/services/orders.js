import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const createOrder = async (order) => {
  try {
    const res = await axios.post(`${API_URL}/${END_POINTS.ORDER}`, order, {
      headers: await getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const submitSuccessOrder = async (orderInfo) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.ORDER}/success`,
      { orderInfo },
      {
        headers: await getAuthHeader(),
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const failOrder = async (orderId) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.ORDER}/fail`,
      { rzpOrderId: orderId },
      {
        headers: await getAuthHeader(),
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
