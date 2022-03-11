import { Grid } from "@material-ui/core";
import React from "react";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import SolopreneurBanner from "../SoloprenuerBanner";
import SolopreneurAdvantages from "../SolopreneurAdvantages";

import SolopreneurSuccess from "../SolopreneurSuccess";
import SolopreneurLife from "../SolopreneurLife";

function SolopreneurView({ content }) {
  return (
    <Grid style={{ width: "100vw" }}>
      <LandingHeader/>
      <SolopreneurBanner content={content.home} />
      <SolopreneurAdvantages content={content.banner} />
      <SolopreneurSuccess content={content.stories} />
      <SolopreneurLife content={content.life}/>
      <Footer/>
    </Grid>
  );
}

export default SolopreneurView;
