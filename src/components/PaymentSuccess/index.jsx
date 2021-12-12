import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";

function PaymentSuccess({ orderId, message, image }) {
  const classes = styles();
  const globalClasses = globalStyles();

  return (
    <Grid className={classes.root}>
      <Grid container justify="center" spacing={3}>
        <Grid item sm={12} container justify="center">
          <img className={classes.success} src={image} alt="" />
        </Grid>
        <Grid item sm={12} container justify="center">
          <Typography
            align="center"
            variant="h6"
            className={globalClasses.bold500}
          >
            {message}
          </Typography>
          {orderId ? (
            <Typography align="center">ORDER ID : {orderId}</Typography>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "1em 0",
  },
  success: {
    maxHeight: "5em",
    borderRadius: "50%",
  },
  occupation: {
    color: "#828282",
    width: "100%",
    textAlign: "center",
  },
  view: {
    width: "100%",
  },
}));

export default PaymentSuccess;
