import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import numeral from "numeral";
import ValueCard from "../ValueCard";

function VendorRevenueUserAggSec({ stats }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!stats) {
    return <h1>{stats}</h1>;
  }

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
              subTitle={"Total Customers"}
            />
          </Grid>
        </Grid>
        <Grid container item sm={6} spacing={matches ? 0 : 3}>
          <Grid item xs={6} className={classes.leftContainer}>
            <ValueCard
              title={`Rs. ${numeral(stats.lastMonthSummary.revenue).format(
                "0,0"
              )}`}
              subTitle={`Total Revenue last month`}
            />
          </Grid>
          <Grid item xs={6} className={classes.rightContainer}>
            <ValueCard
              title={`${numeral(stats.lastMonthSummary.customers).format(
                "0,0"
              )}`}
              subTitle={"Total customers last month"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
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
