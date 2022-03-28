import { Grid, Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Link from "next/link";
import React from "react";

import { event, SIGNUP_CLICK } from "../../utils/ga";
import ButtonCapsule from "../ButtonCapsule";
import { styles } from "./styles";

function FeaturesContent({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid className={classes.textContainer}>
        <Grid container sx={{ whiteSpace: "nowrap", overflowX: "auto" }}>
          <Typography
            variant="h2"
            className={`${classes.titleSection} ${classes.titleSection1}`}
          >
            {content.titleSection1}&nbsp;{" "}
            <Typography className={`${classes.aquaText} `}>
              {content.titleSection2}
            </Typography>
          </Typography>
        </Grid>
        <Typography className={classes.descriptionText}>
          {content.description}
        </Typography>
        <Grid container className={classes.buttonContain}>
          <Link href={"/signup"}>
            <ButtonCapsule
              buttonStyle={classes.capsuleButton}
              text="Get Started"
              onClick={() =>
                event({ action: SIGNUP_CLICK, params: { location: "header" } })
              }
              icon={<CallMadeIcon className={classes.callMadeIcon} />}
            />
          </Link>
        </Grid>
        {/* <Button
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
        </Button> */}
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
