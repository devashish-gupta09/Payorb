import React from "react";

import { getVendorVerifiedDetails } from "../services/vendor";

const useFetchVendorVerifiedDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [verifiedDetails, setVerfiedDetails] = React.useState();

  React.useEffect(() => {
    getVendorVerifiedDetails()
      .then((res) => {
        if (res) {
          setVerfiedDetails(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { verifiedDetails, loading, error };
};

export default useFetchVendorVerifiedDetails;
