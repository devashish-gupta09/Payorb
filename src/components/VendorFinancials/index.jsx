import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import useFetchStats from "../../hooks/useFetchStats";
import SkeletonLoading from "../SkeletonLoading";
import VendorEventsStats from "../VendorEventStats";
import VendorRevenueUserAggSec from "../VendorRevenueUserAggSec";
import VendorSalesGraph from "../VendorSalesGraph";

function VendorFinancials() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const classes = styles();

  const { data, loading, error } = useFetchStats(startDate, endDate);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return (
      <>
        <h2>Something went wrong</h2>
        <h5>error</h5>
      </>
    );
  }

  return (
    <Grid className={classes.root}>
      <VendorRevenueUserAggSec stats={data}></VendorRevenueUserAggSec>
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
