import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { ALERT_BANNER_TYPES } from "../../constants/alerts";

import { getMessageForDetails } from "../../utils/vendor";

function AuthAlertGrid({ details }) {
  const classes = styles();
  const msgDetails = getMessageForDetails(details);

  if (msgDetails) {
    return (
      <Grid className={`${classes.root} ${classes[msgDetails.type]}`}>
        <Typography className={classes.message}>
          Edit & Sharing feature will be enabled once account is complete
        </Typography>
      </Grid>
    );
  }

  return null;
}

const styles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    padding: "0.5em 1em",
    width: "fit-content",
    borderRadius: "0.5em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  [ALERT_BANNER_TYPES.WARNING]: {
    background: "#ffa494",
  },
  [ALERT_BANNER_TYPES.CONFIRMATION]: {
    background: "#ffa494",
  },
  message: {
    fontSize: "0.75em",
    fontWeight: "bold",
    color: "black",
  },
}));

export default AuthAlertGrid;
