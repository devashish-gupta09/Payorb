import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import FaqsSection from "../FAQsSection";

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
        <Grid
          style={{
            position: "absolute",
            width: "100%",
          }}
        >
          <LandingHeader />
        </Grid>
        <Grid
          style={{
            paddingTop: "5%",
            height: "fit-content",
          }}
        >
          <HomeSection content={content.home} />
        </Grid>
      </Grid>
      <HowItWorksSection content={content.howItWorks} />
      <FeatureSectionHome content={content.feature} />
      <WhyChooseUsSection content={content.whyChooseUs} />
      <PricingSection content={content.pricing} />
      <FaqsSection content={content.faqs} />
      <Footer />
    </Grid>
  );
}

export default Landing;


