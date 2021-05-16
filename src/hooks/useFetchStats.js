import { useEffect, useState } from "react";

import { getEventStats } from "../services/stats";

function useFetchStats(startDate, endDate) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getEventStats({ startDate, endDate })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setData(res.data.stats);
        } else {
          setLoading(false);
          setError("Could not fetch stats");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Could not fetch stats.");
      });
  }, []);

  return {
    loading,
    data,
    error,
  };
}

export default useFetchStats;
