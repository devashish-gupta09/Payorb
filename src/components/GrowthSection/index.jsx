import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ButtonCapsule from "../ButtonCapsule";
import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";
import Link from "next/link";

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
        {content.growthPoints.map((point, index) => {
          return (
            <Grid key={index} item sm={6}>
              <Grid container className={classes.point}>
                <Grid>
                  <img src={point.image} className={classes.pointCheck} />
                </Grid>

                <Typography className={classes.pointText}>
                  {point.description}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify={"center"} className={classes.bottomButton}>
        <Link href={"/signup"}>
          <ButtonCapsule text={"Get Started"} />
        </Link>
      </Grid>
    </Grid>
  );
}

export default GrowthSection;
