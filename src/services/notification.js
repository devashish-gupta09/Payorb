import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const sendNotificationToCustomers = async ({
  eventId,
  notificationTypes,
  filterEventIds,
}) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.NOTIFICATION}/customers`,
      { eventId, notificationTypes, filterEventIds },
      {
        headers: await getAuthHeader(),
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
