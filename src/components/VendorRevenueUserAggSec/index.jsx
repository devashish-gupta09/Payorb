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
import DashboardCard from "../DashboardCard";
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

  if (loading) {
    return (
      <Grid style={{ width: "96%" }}>
        <SkeletonLoading message="Loading dashboard stats" />
      </Grid>
    );
  }

  if (error) {
    return (
      <>
        <DashboardCard rootClass={classes.errorCard}>
          <h2>No Stats Generated.</h2>
          <h5>Stats will be generated when you have bookings to display.</h5>
        </DashboardCard>
      </>
    );
  }

  if (stats) {
    return (
      <Grid className={classes.outerContainer}>
        <Typography
          variant={"h6"}
          className={`${classes.dashboard} ${classes.title}`}
        >
          Dashboard
        </Typography>
       
        <Grid
          sm={12}
          xs={12}
          container
          className={classes.fix}

        >
          <Grid
            item
            xs={10}
            sm={3}
            className={`${classes.box} ${classes.leftTopContainer}`}
          >
            <ValueCard
              title={`₹ ${numeral(stats.totalRevenue).format("0,0")}`}
              subTitle={"Total Revenue"}
              photo={"/assets/vendorDashboard/yearlyTotalRevenue.svg"}
              bottomText={"This year"}
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={3}
            className={`${classes.box} ${classes.rightTopContainer}`}
          >
            <ValueCard
              title={`${numeral(stats.totalCustomers).format("0,0")}`}
              subTitle={"Total Bookings"}
              photo={"/assets/vendorDashboard/yearlyTotalBookings.svg"}
              bottomText={"This year"}
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={3}
            className={`${classes.box} ${classes.leftBottomContainer}`}
          >
            <ValueCard
              title={`₹ ${numeral(stats.lastMonthSummary.revenue).format(
                "0,0"
              )}`}
              subTitle={`Total Revenue (last month)`}
              photo={"/assets/vendorDashboard/totalRevenue.svg"}
              bottomText={"Last Month"}
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={3}
            className={`${classes.box} ${classes.rightBottomContainer}`}
          >
            <ValueCard
              title={`${numeral(stats.lastMonthSummary.customers).format(
                "0,0"
              )}`}
              subTitle={"Total bookings (last month)"}
              photo={"/assets/vendorDashboard/totalBookings.svg"}
              bottomText={"Last Month"}
            />
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
  outerContainer:{
    position:"relative",
    marginLeft:"4em",
    [theme.breakpoints.down("sm")]:{
      position:"static",
      marginLeft:"0",
    }
    },
  title: {
    fontWeight:"600",
    fontSize: "1.2em",
    paddingBottom: "1em",
    [theme.breakpoints.down("sm")]:{
      marginLeft:"1em",
      marginTop:"5em",
    }
  },
  fix: {
    justifyContent:'flex-start',
    [theme.breakpoints.down("sm")]:{
      justifyContent:"center",
    }
  },
  box: {
    boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.4em",
    marginTop: "0.4em",
    margin:"0.4em",
 
  },
  leftTopContainer: {
    borderTop: "0.3em solid #465DD6",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0.5em",
    },
  },
  rightTopContainer: {
    borderTop: "0.3em solid #FFB648",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0.5em",
    },
  },
  leftBottomContainer: {
    borderTop: "0.3em solid #FF007F",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0.5em",
    },
  },
  rightBottomContainer: {
    borderTop: "0.3em solid #4BDE97",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0.5em",
    },
  },
  errorCard: {
    padding: "2em",
    width: "96%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default VendorRevenueUserAggSec;
