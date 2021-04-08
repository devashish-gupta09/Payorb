import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import numeral from "numeral";
import ValueCard from "../ValueCard";

function VendorRevenueUserAggSec() {
  const classes = styles();
  const globalClasses = globalStyles();

  return (
    <Grid style={{ width: "100%" }}>
      <Typography
        variant={"h6"}
        className={`${globalClasses.boldSixHundred} ${classes.title}`}
      >
        Dashboard
      </Typography>

      <Grid container className={classes.fix}>
        <Grid
          item
          sm={6}
          container
          spacing={3}
          className={classes.leftContainer}
        >
          <Grid item xs={6}>
            <ValueCard
              title={`$${numeral(3412).format("0,0")}`}
              subTitle={"Total Revenue"}
            />
          </Grid>
          <Grid item xs={6}>
            <ValueCard
              title={`${numeral(341).format("0,0")}`}
              subTitle={"Total User"}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={6}
          container
          spacing={3}
          className={classes.rightContainer}
        >
          <Grid item xs={6}>
            <ValueCard
              title={`$${numeral(34152).format("0,0")}`}
              subTitle={"Total Revenue"}
            />
          </Grid>
          <Grid item xs={6}>
            <ValueCard
              title={`$${numeral(34152).format("0,0")}`}
              subTitle={"Total Revenue"}
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
    [theme.breakpoints.down("sm")]: {
      "& > div": {
        margin: 0,
      },
    },
  },
  leftContainer: {
    paddingRight: "0.75em",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
    },
  },
  rightContainer: {
    paddingLeft: "0.75em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },
}));

export default VendorRevenueUserAggSec;
