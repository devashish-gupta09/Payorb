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
} from "../src/services/aboutUs";

export default function About({ landing }) {
  return (
      <Grid backgroundColor={"blue"}>
      <PageTitle title="Payorb | About Us" />
      <AboutView content={landing} />
      </Grid>

  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const vision = await getVision();
  const story = await getPayOrbStory();
  const founders= await getFoundersData();
  const advisors= await getAdvisorsData();

  return {
    props: {
      landing: {
        home,
        vision,
        story,
        founders,
        advisors,
      },
    },
  };
}
