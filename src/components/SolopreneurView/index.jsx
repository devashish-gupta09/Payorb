import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import SolopreneurBanner from "../SoloprenuerBanner";
import SolopreneurAdvantages from "../SolopreneurAdvantages";

import SolopreneurSuccess from "../SolopreneurSuccess";
import SolopreneurLife from "../SolopreneurLife";

function SolopreneurView({ content }) {
  const classes = styles();
  return (
    <Grid>
      <Grid className={classes.box}>
        <Grid
          style={{
            position: "absolute",
            width: "100%",
          }}
        >
          <LandingHeader />
        </Grid>
        <Grid
          style={{
            paddingTop: "5%",
            height: "fit-content",
          }}
        >
          <SolopreneurBanner content={content.home} />
        </Grid>
      </Grid>

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
