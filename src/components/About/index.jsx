import { Grid } from "@material-ui/core";
import React from "react";

import AboutBanner from "../AboutBanner";
import AboutDetail from "../AboutDetail";

import LandingHeader from "../LandingHeader";

import DashboardContainer from "../VendorDashboardContainer";

function AboutView() {
  return (
    <Grid>
      <LandingHeader />
      <AboutBanner />
      <AboutDetail />
      <DashboardContainer></DashboardContainer>
    </Grid>
  );
}

export default AboutView;
