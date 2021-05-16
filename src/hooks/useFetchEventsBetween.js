import { useEffect, useState } from "react";

import { getEventsBetween } from "../services/events";

function useFetchEventsBetween(startDate, endDate) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getEventsBetween({ startDate, endDate })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          console.log("RES : ", res);
          setData(res.data.events);
        } else {
          setLoading(false);
          setError("Could not fetch events");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Could not fetch event.");
      });
  }, [startDate, endDate]);

  return {
    loading,
    data,
    error,
  };
}

export default useFetchEventsBetween;
