import { useEffect, useState } from "react";

import { getCustomersForVendor } from "../services/customers";

const useFetchVendorCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getCustomersForVendor()
      .then((res) => {
        if (res.data.customers) {
          setLoading(false);
          setCustomers(res.data.customers);
        } else {
          setLoading(false);
          setError("Could not fetch customers.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Could not fetch customers.");
      });
  }, []);

  return {
    loading,
    customers,
    error,
  };
};

export default useFetchVendorCustomers;
