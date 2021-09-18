import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const sendNotificationToCustomers = async ({
  eventIds,
  notificationTypes,
}) => {
  try {
    for (const eventId of eventIds) {
      const res = await axios.post(
        `${API_URL}/${END_POINTS.NOTIFICATION}/customers`,
        { eventId, notificationTypes },
        {
          headers: await getAuthHeader(),
        }
      );
      return res.data;
    }
  } catch (err) {
    throw err.response.data || err.message;
  }
};
