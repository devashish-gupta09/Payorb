import { Grid } from "@material-ui/core";
import FeaturesPage from "../src/components/FeaturesPage";
import PageTitle from "../src/components/PageTitle";
import {
  getFeaturesContent,
  getHomeContent,
  getFeatureBookings,
  getUserBenefits,
} from "../src/services/landing";

export default function Features({ landing }) {
  return (
      <Grid>
      <PageTitle title="Payorb | Features" />
      <FeaturesPage content={landing} />
      </Grid>

  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const feature = await getFeaturesContent();
  const userBenefits= await getUserBenefits();
  const getStarted= await getFeatureBookings();

  return {
    props: {
      landing: {
        home,
        feature,
        userBenefits,
        getStarted,
      },
    },
  };
}