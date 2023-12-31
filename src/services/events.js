import axios from "axios";

import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const createEvent = async (eventDetails) => {
  try {
    const res = await axios.post(
      `${API_URL}/${END_POINTS.EVENTS}`,
      eventDetails,
      {
        headers: await getAuthHeader(),
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const editEvent = async (eventDetails) => {
  try {
    const res = await axios.patch(
      `${API_URL}/${END_POINTS.EVENTS}`,
      eventDetails,
      {
        headers: await getAuthHeader(),
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getEvent = async (eventLink) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`, {
      params: {
        link: eventLink,
      },
      headers: await getAuthHeader(),
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getEventsVendorDashboard = async (params) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`, {
      headers: await getAuthHeader(),
      params,
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getEventPublic = async (link, vendorId) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`, {
      params: {
        link,
        vendorId,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getEventsPublic = async (params) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`, {
      params,
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const getEventsBetween = async (params) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}/schedule`, {
      headers: await getAuthHeader(),
      params,
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/${END_POINTS.EVENTS}`,

      {
        headers: await getAuthHeader(),
        params: { link: eventId },
      }
    );

    return res.data;
  } catch (err) {
    return err.response.data || err.message;
  }
};

// no-auth required
// vendorId : string
export const getOpenEvents = async (eventParams) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}/open`, {
      params: { ...eventParams, currentDate: new Date().toISOString() },
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};

// no-auth required
// vendorId : string
export const getClosedEvents = async (eventParams) => {
  try {
    const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}/closed`, {
      params: { ...eventParams, currentDate: new Date().toISOString() },
    });
    return res.data;
  } catch (err) {
    throw err.response.data || err.message;
  }
};
