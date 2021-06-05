import React from "react";

import { getVendorVerifiedDetails } from "../services/vendor";

const useFetchVendorVerifiedDetails = (dispatch) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [verifiedDetails, setVerfiedDetails] = React.useState();
  const [refetch, setRefetch] = React.useState();

  const refetchDetails = React.useCallback(() => {
    setRefetch(true);
  }, []);

  React.useEffect(() => {
    getVendorVerifiedDetails()
      .then((res) => {
        if (res) {
          setVerfiedDetails(res.data);
          setLoading(false);
        }

        if (refetch) {
          setRefetch(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        if (refetch) {
          setRefetch(false);
        }
      });
  }, [refetch]);

  return { verifiedDetails, loading, error, refetchDetails };
};

export default useFetchVendorVerifiedDetails;
