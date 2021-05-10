import { Grid, Typography } from "@material-ui/core";
import LandingHeader from "../LandingHeader";
import HomeSection from "../HomeSection";
import FeatureSection from "../FeatureSection";
import EventRegistrationSection from "../EventRegistrationSection";
import UserRegistrationSection from "../UserRegistrationSection";
import ClientReviewSection from "../ClientReviewSection";
import GrowthSection from "../GrowthSection";
import Footer from "../LandingFooter";

function Landing({ content }) {
  return (
    <Grid>
      <LandingHeader />
      <h1>Landing</h1>
      <HomeSection content={content.home} />
      <FeatureSection content={content.feature} />
      <UserRegistrationSection content={content.userRegistration} />
      <EventRegistrationSection content={content.eventRegistration} />
      <ClientReviewSection content={content.clientReview} />
      <GrowthSection content={content.growth} />
      <Footer />
    </Grid>
  );
}

export default Landing;
