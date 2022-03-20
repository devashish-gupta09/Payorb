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
    <Grid style={{ padding: "0", width: "100vw" }}>
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

const styles = makeStyles((theme) => ({
  box: {
    width: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `url("/assets/homepage.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      background: `#F0FFFE`,
      width: "100vw",
    },
  },
}));
