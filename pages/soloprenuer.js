import { Grid } from "@material-ui/core";
import * as React from "react";
import SolopreneurView from "../src/components/SolopreneurView";
import PageTitle from "../src/components/PageTitle";
import {
  getHomeContent,
  getSolopreneurAdvantages,
  getSolopreneurStories,
  getSolopreneurLife,
} from "../src/services/solopreneur";

export default function About({ solopreneur }) {
  return (
    <Grid backgroundColor={"blue"}>
      <PageTitle title="Payorb | Solopreneur" />
      <SolopreneurView content={solopreneur} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getHomeContent();
  const banner = await getSolopreneurAdvantages();
  const stories = await getSolopreneurStories();
  const life = await getSolopreneurLife();

  return {
    props: {
      solopreneur: {
        home,
        banner,
        stories,
        life,
      },
    },
  };
}
