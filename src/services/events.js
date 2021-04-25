import axios from "axios"
import { API_URL } from "../config/urls";
import { END_POINTS } from "../constants/api";
import { getAuthHeader } from "./api";

export const createEvent = async (eventDetails) => {
    try {
        const res = await axios.post(`${API_URL}/${END_POINTS.EVENTS}`, eventDetails, {
            headers: await getAuthHeader(),
        });
        return res.data;
    } catch (err) {
        throw err.response.data
    }
};

export const editEvent = async (eventDetails) => {
    try {
        const res = await axios.patch(`${API_URL}/${END_POINTS.EVENTS}`, eventDetails, {
            headers: await getAuthHeader(),
        });
        return res.data;
    } catch (err) {
        throw err.response.data
    }
};

export const getEvent = async (eventLink) => {
    try {
        const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`,
            {
                params: {
                    link: eventLink
                },
                headers: await getAuthHeader(),
            });
        return res.data;
    } catch (err) {
        throw err.response.data || err.message
    }
}

export const getEventsVendorDashboard = async ({ limit, orderBy, orderType, startFrom }) => {
    console.log(limit, orderBy, orderType)
    try {
        const res = await axios.get(`${API_URL}/${END_POINTS.EVENTS}`,
            {
                headers: await getAuthHeader(),
                params: {
                    limit, orderBy, orderType, startFrom
                }
            });
        return res.data;
    } catch (err) {
        throw err.response.data || err.message
    }
}