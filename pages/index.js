import { Grid } from "@material-ui/core";
import React from "react";

import Landing from "../src/components/Landing";
import PageTitle from "../src/components/PageTitle";
import {
  // getClientReviewContent,
  // getEventRegistrationContent,
  getFaqsContent,
  getFeaturesContent,
  getHomeContent,
  getHowItWorksContent,
  // getUserRegistrationContent,
  // getGrowthContent,
  getWhyChooseUsContent,
  getPricingContent,
} from "../src/services/landing";

export default function Index({ landing }) {
  return (
    <Grid style={{ backgroundColor: "#fff" }}>
      <PageTitle title="Payorb | Home" />
      <Landing content={landing} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const howItWorks = await getHowItWorksContent();
  const feature = await getFeaturesContent();
  const whyChooseUs = await getWhyChooseUsContent();
  const pricing = await getPricingContent();
  const faqs = await getFaqsContent();
  // const userRegistration = await getUserRegistrationContent();
  // const eventRegistration = await getEventRegistrationContent();
  // const clientReview = await getClientReviewContent();
  // const growth = await getGrowthContent();

  return {
    props: {
      landing: {
        home,
        howItWorks,
        feature,
        whyChooseUs,
        pricing,
        faqs,
        // userRegistration,
        // eventRegistration,
        // clientReview,
        // growth,
      },
    },
  };
}
