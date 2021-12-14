import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import CustomerViewHeader from "../CustomerViewHeader";
import DashboardCard from "../DashboardCard";
import PageTitle from "../PageTitle";
import ReviewForm from "../ReviewForm";
import DashboardContainer from "../VendorDashboardContainer";

function Review() {
  const classes = styles();

  return (
    <Grid>
      <PageTitle title="Payorb | Review" />
      <CustomerViewHeader />
      <DashboardContainer>
        <Grid className={classes.root}>
          <Typography variant={"h4"} className={classes.title}>
            Event Review
          </Typography>
          <DashboardCard>
            <ReviewForm />
          </DashboardCard>
        </Grid>
      </DashboardContainer>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: `4em 5em`,
    [theme.breakpoints.down("sm")]: {
      padding: `2em 0`,
    },
  },
  title: {
    paddingBottom: "0.75em",
    fontWeight: "bold",
  },
}));

export default Review;
