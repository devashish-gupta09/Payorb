import { makeStyles, Grid } from "@material-ui/core";
import React from "react";

import EventRegistrationSection from "../EventRegistrationSection";
import FeatureSection from "../FeatureSection";
import GrowthSection from "../GrowthSection";
import HomeSection from "../HomeSection";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import UserRegistrationSection from "../UserRegistrationSection";

function Landing({ content }) {
  const classes = styles();

  return (
    <Grid style={{ padding: "0" }}>
      <Grid className={classes.box}>
        <LandingHeader />
        <HomeSection content={content.home} />
      </Grid>
      {/* <HowItWorksSection content={content.howItWorks} /> */}
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

const styles = makeStyles((theme) => ({
  box: {
    backgroundImage: `url("/assets/homepage.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "99vw",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      background: `#F0FFFE`,
      width: "100vw",
    },
  },
}));
