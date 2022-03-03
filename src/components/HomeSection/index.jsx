import { Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

import { event, SIGNUP_CLICK } from "../../utils/ga";

import LandingCarousel from "../LandingCarousel";
import { styles } from "./styles";

function HomeSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid className={classes.textContainer}>
        <Grid container>
          <Typography variant="h2" className={`${classes.titleSection}`}>
            {content.titleSection1}
          </Typography>
          <Typography
            variant="h2"
            className={`${classes.titleSection} ${classes.aquaText}`}
          >
            {content.titleSection1}&nbsp;{" "}
            <Typography className={`${classes.aquaText} `}>
              {content.titleSection2}
            </Typography>
          </Typography>
        </Grid>

        <Typography
          gutterBottom
          variant="h2"
          className={`${classes.titleSection}`}
        >
          {content.titleSection3}
        </Typography>
        <Typography variant={"h6"} className={classes.descriptionText}>
          {content.description}
        </Typography>
        <Grid container>
          <Link href={"/signup"}>
            <Button
              className={classes.capsuleButton}
              onClick={() =>
                event({ action: SIGNUP_CLICK, params: { location: "header" } })
              }
            >
              Get Started
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeSection;
