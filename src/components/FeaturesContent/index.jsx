import { Button, Grid, Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React from "react";
import { event, SIGNUP_CLICK } from "../../utils/ga";
import { styles } from "./styles";

function FeaturesContent({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      {/* <Grid>
        <LandingCarousel urls={content.urls} />
      </Grid> */}
      <Grid className={classes.textContainer}>
        <Grid container>
          <Typography
            variant="h4"
            className={`${classes.titleSection} ${classes.titleSection1}`}
          >
            {content.titleSection1}
          </Typography>
          <Typography
            variant="h2"
            className={`${classes.titleSection} ${classes.aquaText}`}
          >
            {content.titleSection2}
          </Typography>
        </Grid>

       {/* <Typography
          gutterBottom
          variant="h2"
          className={`${classes.titleSection}`}
        >
          {content.titleSection3}
       </Typography>*/}
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
      </Grid>
      <Grid className={classes.imgContainer}>
        <img
          src="/assets/videosnip.png"
          alt="landing"
          className={classes.image}
        />
      </Grid>
    </Grid>
  );
}

export default FeaturesContent;