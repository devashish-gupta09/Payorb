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
    <Grid>
      <LandingHeader />
      <FeaturesContent content={content.home} />
      <FeatureSection content={content.feature} />
      {/*<UserRegistrationSection content={content.userRegistration} />
        <EventRegistrationSection content={content.eventRegistration} />*/}
      <FeatureBenefitsSection content={content.userBenefits}/>
      {/* <ClientReviewSection content={content.clientReview} /> */}
      <FeatureBookingSection content={content.getStarted} />
      <Footer />
    </Grid>
  );
}

export default FeaturesPage;
