import { Grid } from "@material-ui/core";
import React from "react";
import FeatureSection from "../FeatureSection";
import FeatureBookingSection from "../FeatureBookingSection";
import FeaturesContent from "../FeaturesContent";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import FeatureBenefitsSection from "../FeatureBenefitsSection";

function FeaturesPage({ content }) {
  return (
    <Grid style={{ width: "100vw" }}>
      <LandingHeader />
      <FeaturesContent content={content.home} />
      <FeatureSection content={content.feature} />
      <FeatureBenefitsSection content={content.userBenefits} />
      <Footer />
    </Grid>
  );
}

export default FeaturesPage;
