import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import AboutBanner from "../AboutBanner";
import AboutVision from "../AboutVision";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";
import AboutStoryPayOrb from "../AboutStoryPayOrb";
import AboutFounders from "../AboutFounders";
import AboutAdvisors from "../AboutAdvisors";

function AboutView({ content }) {
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
          <AboutBanner content={content.home} />
        </Grid>
      </Grid>

      <AboutVision content={content.vision} />
      <AboutStoryPayOrb content={content.story} />
      <AboutFounders content={content.founders} />
      <AboutAdvisors content={content.advisors} />
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

export default AboutView;
