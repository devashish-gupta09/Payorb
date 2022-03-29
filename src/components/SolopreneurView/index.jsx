import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import SolopreneurAdvantages from "../SolopreneurAdvantages";

import SolopreneurLife from "../SolopreneurLife";
import SolopreneurSuccess from "../SolopreneurSuccess";
import SolopreneurBanner from "../SoloprenuerBanner";

function SolopreneurView({ content }) {
  const classes = styles();
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

const styles = makeStyles((theme) => ({
  box: {
    width: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: "url(/assets/homepage-1.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      background: `#F0FFFE`,
      width: "100vw",
    },
  },
}));

export default SolopreneurView;
