import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import numeral from "numeral";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import useFetchStats from "../../hooks/useFetchStats";
import SkeletonLoading from "../SkeletonLoading";
import ValueCard from "../ValueCard";

function VendorRevenueUserAggSec() {
  const classes = styles();
  const globalClasses = globalStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const { data: stats, loading, error } = useFetchStats(startDate, endDate);
  console.log(stats);

  if (loading) {
    return <SkeletonLoading message="Loading dashboard stats" />;
  }

  if (error) {
    return (
      <>
        <h2>Something went wrong</h2>
        <h5>{error}</h5>
      </>
    );
  }

  if (stats) {
    return (
      <Grid style={{ width: "100%" }}>
        <Typography
          variant={"h6"}
          className={`${globalClasses.boldSixHundred} ${classes.title}`}
        >
          Dashboard
        </Typography>

        <Grid container className={classes.fix} spacing={2}>
          <Grid item sm={6} container spacing={matches ? 0 : 3}>
            <Grid item xs={6} className={classes.leftContainer}>
              <ValueCard
                title={`Rs. ${numeral(stats.totalRevenue).format("0,0")}`}
                subTitle={"Total Revenue"}
              />
            </Grid>
            <Grid item xs={6} className={classes.rightContainer}>
              <ValueCard
                title={`${numeral(stats.totalCustomers).format("0,0")}`}
                subTitle={"Total Bookings"}
              />
            </Grid>
          </Grid>
          <Grid container item sm={6} spacing={matches ? 0 : 3}>
            <Grid item xs={6} className={classes.leftContainer}>
              <ValueCard
                title={`Rs. ${numeral(stats.lastMonthSummary.revenue).format(
                  "0,0"
                )}`}
                subTitle={`Total Revenue (last month)`}
              />
            </Grid>
            <Grid item xs={6} className={classes.rightContainer}>
              <ValueCard
                title={`${numeral(stats.lastMonthSummary.customers).format(
                  "0,0"
                )}`}
                subTitle={"Total bookings (last month)"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
  },
  title: {
    fontSize: "1.2em",
    paddingBottom: "1em",
  },
  fix: {
    // padding: "0.5em",
  },
  leftContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0.5em",
    },
  },
  rightContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0.5em",
    },
  },
}));

export default VendorRevenueUserAggSec;
