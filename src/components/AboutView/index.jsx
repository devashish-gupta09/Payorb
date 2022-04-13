import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

// import AboutAdvisors from "../AboutAdvisors";
import AboutBanner from "../AboutBanner";
import AboutFounders from "../AboutFounders";
import AboutStoryPayOrb from "../AboutStoryPayOrb";
import AboutVision from "../AboutVision";
import Footer from "../LandingFooter";
import LandingHeader from "../LandingHeader";

function AboutView({ content }) {
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
          <AboutBanner content={content.home} />
        </Grid>
      </Grid>

      <AboutVision content={content.vision} />
      <AboutStoryPayOrb content={content.whyWeHere} />
      <AboutFounders content={content.founders} />
      {/* <AboutAdvisors content={content.advisors} /> */}
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
