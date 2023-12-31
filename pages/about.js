import { Grid } from "@material-ui/core";

import * as React from "react";

import AboutView from "../src/components/AboutView";
import PageTitle from "../src/components/PageTitle";
import {
  getVision,
  getHomeContent,
  getPayOrbStory,
  getFoundersData,
  getAdvisorsData,
  getWhatAreWeHereFor,
} from "../src/services/aboutUs";

export default function About({ about }) {
  return (
    <Grid backgroundColor={"blue"}>
      <PageTitle title="Payorb | About Us" />
      <AboutView content={about} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const vision = await getVision();
  const story = await getPayOrbStory();
  const founders = await getFoundersData();
  const advisors = await getAdvisorsData();
  const whyWeHere = await getWhatAreWeHereFor();

  return {
    props: {
      about: {
        home,
        vision,
        story,
        founders,
        advisors,
        whyWeHere,
      },
    },
  };
}
