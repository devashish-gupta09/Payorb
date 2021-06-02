import { AppBar, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";

const WARNING = "warning";
const CONFIRMATION = "confirmation";

const getMessageForDetails = (details) => {
  const paymentDetails = details.find(
    (detail) => detail.name === "paymentDetails"
  );

  switch (paymentDetails.status) {
    case "MISSING":
      return {
        msg:
          "[Payment Section Incomplete] To create events and services, please add your Payment details.",
        type: WARNING,
      };
    case "RZP_PENDING":
      return {
        msg:
          "[Account Under Processing] Thank you for submitting your Payment details. Your account will be activated soon.",
        type: CONFIRMATION,
      };
    default:
      return;
  }
};

function AuthAlertBanner() {
  const classes = styles();
  const { loading, verifiedDetails } = useFetchVendorVerifiedDetails();

  if (!loading && verifiedDetails && verifiedDetails.length > 0) {
    const details = getMessageForDetails(verifiedDetails);

    if (details) {
      return (
        <AppBar
          className={`${classes.root} ${classes[details.type]}`}
          position={"fixed"}
        >
          <Typography className={classes.message}>{details.msg}</Typography>
        </AppBar>
      );
    }
  }

  return null;
}

const styles = makeStyles((theme) => ({
  root: {
    marginTop: "4.5em",
    padding: "1em 2em",
  },
  [WARNING]: {
    background: "#ffd84a",
  },
  [CONFIRMATION]: {
    background: "#00DDBC",
  },
  message: {
    fontWeight: "bold",
    color: "black",
  },
}));

export default AuthAlertBanner;
