import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

function PricingPlan({ feature }) {
  const classes = styles();

  return (
    <>
      <Typography variant="body1" className={classes.feature}>
        &#10004;&nbsp;&nbsp;{feature}
      </Typography>
    </>
  );
}

export default PricingPlan;

const styles = makeStyles((theme) => ({
  feature: {
    fontSize: "0.8em",
    paddingBottom: "0.5em",
  },
}));
