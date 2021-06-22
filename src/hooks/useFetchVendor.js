import { useEffect, useState } from "react";

import { getUser } from "../services/auth";

function useFetchVendor(userUID) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getUser(userUID)
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setData(res.data.vendor);
        } else {
          setLoading(false);
          setError("Could not fetch vendor");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Could not fetch vendor.");
      });
  }, []);

  return {
    loading,
    data,
    error,
  };
}

export default useFetchVendor;
