import { useEffect, useState } from "react";

import { getUser } from "../services/auth";
import { getVendorPublic } from "../services/vendor";

function useFetchVendor(userUID, vendor = true) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (vendor) {
      getUser()
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setData(res.data);
          } else {
            setLoading(false);
            setError("Could not fetch vendor");
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message || "Could not fetch vendor.");
        });
    } else {
      getVendorPublic(userUID)
        .then((res) => {
          if (res.data.vendor) {
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
    }
  }, []);

  return {
    loading,
    data,
    error,
  };
}

export default useFetchVendor;
