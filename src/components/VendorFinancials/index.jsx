import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import VendorEventsStats from "../VendorEventStats";
import VendorRevenueUserAggSec from "../VendorRevenueUserAggSec";
import VendorSalesGraph from "../VendorSalesGraph";

function VendorFinancials() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <VendorRevenueUserAggSec></VendorRevenueUserAggSec>
      <VendorEventsStats></VendorEventsStats>
      <VendorSalesGraph />
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default VendorFinancials;