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
    <Grid  style={{ 
      width:"100%",
      left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    }}>
      <LandingHeader />
      <SolopreneurBanner content={content.home} />
      <SolopreneurAdvantages content={content.banner} />
      <SolopreneurSuccess content={content.stories} />
      <SolopreneurLife content={content.life} />
      <Footer />
    </Grid>
  );
}

export default SolopreneurView;
