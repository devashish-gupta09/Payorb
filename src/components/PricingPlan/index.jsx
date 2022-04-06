import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

function PricingPlan({ feature }) {
  const classes = styles();

  return (
    <Grid container>
      <Grid item xs={1}>
        <Check />
      </Grid>
      <Grid item xs={11}>
        <Typography className={classes.feature}>{feature}</Typography>
      </Grid>
    </Grid>
  );
}

export default PricingPlan;

const styles = makeStyles((theme) => ({
  feature: {
    // fontSize: "0.8em",
    marginLeft: "-1em",
    paddingBottom: "0.5em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0.5em",
    },
  },
}));
