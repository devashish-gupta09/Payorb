import { Button, Grid, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React from "react";

// import LandingCarousel from "../LandingCarousel";
import { styles } from "./styles";

function AboutBanner({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid className={classes.textContainer}>
        <Typography variant={"h2"} className={classes.titleSection}>
          {content.titleSection1}
          <Typography variant={"h2"} className={classes.aquaText}>
            {content.titleSection2}
          </Typography>
        </Typography>
        <Typography variant={"h6"} className={classes.descriptionText}>
          {content.description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AboutBanner;
