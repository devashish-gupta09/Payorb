import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import AboutBanner from "../AboutBanner";
import AboutDetail from "../AboutDetail";
import AboutImageGrid from "../AboutImageGrid";
import AboutTeam from "../AboutTeam";

import LandingFooter from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import PageTitle from "../PageTitle";

function AboutView() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <PageTitle title="Payorb | About" />
      <LandingHeader />
      <AboutBanner />
      <AboutDetail />
      <AboutImageGrid />
      <AboutTeam />
      <LandingFooter />
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    background: "#BDF5F2",
  },
}));

export default AboutView;
