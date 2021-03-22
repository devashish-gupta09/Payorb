import { Grid, Typography } from "@material-ui/core";
import React from "react";
import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function GrowthSection({ content }) {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <LandingSectionContent
        sectionLogo={content.sectionLogo}
        sectionTitle={content.sectionTitle}
        title={content.title}
      />
      <Grid container className={classes.pointsContainer}>
        {content.growthPoints.map((point) => {
          return (
            <Grid item sm={6}>
              <Grid container className={classes.point}>
                <img src={point.image} className={classes.pointCheck} />
                <Typography className={classes.pointText}>
                  {point.description}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default GrowthSection;
