import { Button, Grid, makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React from "react";

import FeatureBenefitsSection from "../FeatureBenefitsSection";
import FeaturesContent from "../FeaturesContent";
import FeatureSection from "../FeatureSection";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";

function FeaturesPage({ content }) {
  const classes = styles();
  return (
    <Grid style={{ padding: 0 }}>
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
          <FeaturesContent content={content.home} />
        </Grid>
        <Button
          className={classes.scroll}
          onClick={() =>
            window.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
        >
          <Grid className={classes.scrollIcon}>
            <ArrowDownwardIcon />
          </Grid>
          Scroll to Explore
        </Button>
      </Grid>
      <FeatureSection content={content.feature} />
      <FeatureBenefitsSection content={content.userBenefits} />
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
  scrollIcon: {
    display: "inline-block",
    position: "relative",
    top: "0.3em",
  },
  scroll: {
    position: "absolute",
    cursor: "pointer",
    paddingLeft: "0",
    bottom: 25,
    left: "4em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default FeaturesPage;
