import { AppBar, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";

const getMessageForDetails = (details) => {
  const paymentDetails = details.find(
    (detail) => detail.name === "paymentDetails"
  );

  switch (paymentDetails.status) {
    case "MISSING":
      return "Payment details are not complete. Please update.";
    case "RZP_PENDING":
      return "Account under processing. Please contact support.";
    default:
      return;
  }
};

function AuthAlertBanner() {
  const classes = styles();
  const { loading, verifiedDetails } = useFetchVendorVerifiedDetails();

  if (!loading && verifiedDetails && verifiedDetails.length > 0) {
    const message = getMessageForDetails(verifiedDetails);

    if (message) {
      return (
        <AppBar className={classes.root} position={"fixed"}>
          <Typography className={classes.message}>{message}</Typography>
        </AppBar>
      );
    }
  }

  return null;
}

const styles = makeStyles((theme) => ({
  root: {
    background: "#ffd84a",
    marginTop: "4.5em",
    padding: "1em 2em",
  },
  message: {
    fontWeight: "bold",
  },
}));

export default AuthAlertBanner;
