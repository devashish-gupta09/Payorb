import { makeStyles, Grid } from "@material-ui/core";
import React from "react";

import FeatureSectionHome from "../FeatureSectionHome";
import HomeSection from "../HomeSection";
import HowItWorksSection from "../HowItWorksSection";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import PricingSection from "../PricingSection";
import WhyChooseUsSection from "../WhyChooseUsSection";

function Landing({ content }) {
  const classes = styles();

  return (
    <Grid style={{ padding: "0" }}>
      <Grid className={classes.box}>
        <LandingHeader />
        <HomeSection content={content.home} />
      </Grid>
      <HowItWorksSection content={content.howItWorks} />
      <FeatureSectionHome content={content.feature} />
      <WhyChooseUsSection content={content.whyChooseUs} />
      <PricingSection content={content.pricing} />
      {/* <UserRegistrationSection content={content.userRegistration} />
      <EventRegistrationSection content={content.eventRegistration} /> */}
      {/* <ClientReviewSection content={content.clientReview} /> */}
      {/* <GrowthSection content={content.growth} /> */}
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
      backgroundImage: `url("/assets/homepage-1.png")`,
    },
  },
}));
