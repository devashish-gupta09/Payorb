import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const sendOTP = async (to, channel) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.TWILIO_SEND_OTP}`,
      {
        to,
        channel,
      },
      {
        headers: await getAuthHeader(),
      }
    );

    return res.data;
  } catch (err) {
    return err.response || err;
  }
};

export const verifyOTP = async (to, code) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.TWILIO_VERIFY_OTP}`,
      {
        to,
        code,
      },
      {
        headers: await getAuthHeader(),
      }
    );

    return res.data;
  } catch (err) {
    return err.response || err;
  }
};
