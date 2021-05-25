import { Grid } from "@material-ui/core";
import React from "react";

import EventRegistrationSection from "../EventRegistrationSection";
import FeatureSection from "../FeatureSection";
import GrowthSection from "../GrowthSection";
import HomeSection from "../HomeSection";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import UserRegistrationSection from "../UserRegistrationSection";

function Landing({ content }) {
  return (
    <Grid>
      <LandingHeader />
      <HomeSection content={content.home} />
      <FeatureSection content={content.feature} />
      <UserRegistrationSection content={content.userRegistration} />
      <EventRegistrationSection content={content.eventRegistration} />
      {/* <ClientReviewSection content={content.clientReview} /> */}
      <GrowthSection content={content.growth} />
      <Footer />
    </Grid>
  );
}

export default Landing;
