import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import VendorRevenueUserAggSec from "../VendorRevenueUserAggSec";

function VendorFinancials() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <VendorRevenueUserAggSec></VendorRevenueUserAggSec>
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
