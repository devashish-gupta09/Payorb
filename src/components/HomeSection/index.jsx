import { Grid, Typography } from "@material-ui/core";
import React from "react";
import LandingCarousel from "../LandingCarousel";
import { styles } from "./styles";

function HomeSection({ content }) {
  const classes = styles();
  return (
    <Grid>
      <Grid>
        <Grid>
          <LandingCarousel urls={content.urls} />
        </Grid>
        <Grid className={classes.textContainer}>
          <Grid container>
            <Typography variant="h2" className={`${classes.titleSection}`}>
              {content.titleSection1}
            </Typography>
            <Typography
              variant="h2"
              className={`${classes.titleSection} ${classes.aquaText}`}
            >
              &nbsp;{`${content.titleSection2}`}
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeSection;
