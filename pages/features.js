import { Grid } from "@material-ui/core";
import * as React from "react";

import FeaturesPage from "../src/components/FeaturesPage";
import PageTitle from "../src/components/PageTitle";
import {
  getFeaturesContent,
  getHomeContent,
  getFeatureBookings,
  getUserBenefits,
} from "../src/services/features";

export default function Features({ features }) {
  return (
    <Grid>
      <PageTitle title="Payorb | Features" />
      <FeaturesPage content={features} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const feature = await getFeaturesContent();
  const userBenefits = await getUserBenefits();
  const getStarted = await getFeatureBookings();

  return {
    props: {
      features: {
        home,
        feature,
        userBenefits,
        getStarted,
      },
    },
  };
}
