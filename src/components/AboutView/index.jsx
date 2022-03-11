import { Grid } from "@material-ui/core";
import React from "react";
import AboutBanner from "../AboutBanner";
import AboutVision from "../AboutVision";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import AboutStoryPayOrb from "../AboutStoryPayOrb";
import AboutFounders from "../AboutFounders";
import AboutAdvisors from "../AboutAdvisors";

function AboutView({ content }) {
  return (
    <Grid style={{ width: "100vw" }}>
      <LandingHeader/>
      <AboutBanner content={content.home} />
      <AboutVision content={content.vision} />
      <AboutStoryPayOrb content={content.story} />
      <AboutFounders content={content.founders}/>
      <AboutAdvisors content={content.advisors}/>
      <Footer/>
    </Grid>
  );
}

export default AboutView;
