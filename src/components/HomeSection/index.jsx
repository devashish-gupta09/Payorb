import { Button, Grid, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React from "react";

import { event, SIGNUP_CLICK } from "../../utils/ga";

// import LandingCarousel from "../LandingCarousel";
import { styles } from "./styles";

function HomeSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      {/* <Grid>
        <LandingCarousel urls={content.urls} />
      </Grid> */}
      <Grid className={classes.textContainer}>
        <Grid container sx={{ whiteSpace: "nowrap", overflowX: "auto" }}>
          <Typography
            variant="h2"
            className={`${classes.titleSection} ${classes.titleSection1}`}
          >
            {content.titleSection1}
            <Typography variant="h2" className={`${classes.aquaText}`}>
              &nbsp;{content.titleSection2}
            </Typography>
          </Typography>
        </Grid>
        <Typography variant={"h6"} className={classes.descriptionText}>
          {content.description}
        </Typography>
        <Grid container className={classes.buttonContain}>
          <Link href={"/signup"}>
            <Button
              className={classes.capsuleButton}
              onClick={() =>
                event({ action: SIGNUP_CLICK, params: { location: "header" } })
              }
            >
              Get Started
              <CallMadeIcon className={classes.callMadeIcon} />
            </Button>
          </Link>
        </Grid>
        <Button className={classes.scroll} onclick="window.scrollBy(0, 100)">
          <Grid className={classes.scrollIcon}>
            <ArrowDownwardIcon />
          </Grid>
          Scroll to Explore
        </Button>
      </Grid>
      <Grid className={classes.imgContainer}>
        <img
          src="/assets/landing-image.svg"
          alt="landing"
          className={classes.image}
        />
      </Grid>
    </Grid>
  );
}

export default HomeSection;