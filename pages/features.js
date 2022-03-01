import { Grid } from "@material-ui/core";

import FeaturesPage from "../src/components/FeaturesPage";
import PageTitle from "../src/components/PageTitle";
import {
  getClientReviewContent,
  getEventRegistrationContent,
  getFeaturesContent,
  getHomeContent,
  getUserRegistrationContent,
  getGrowthContent,
} from "../src/services/landing";

export default function Features({ landing }) {
  return (
    <Grid style={{ backgroundColor: "white" }}>
      <PageTitle title="Payorb | Features" />
      <FeaturesPage content={landing} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const feature = await getFeaturesContent();
  const userRegistration = await getUserRegistrationContent();
  const eventRegistration = await getEventRegistrationContent();
  const clientReview = await getClientReviewContent();
  const growth = await getGrowthContent();

  return {
    props: {
      landing: {
        home,
        feature,
        userRegistration,
        eventRegistration,
        clientReview,
        growth,
      },
    },
  };
}