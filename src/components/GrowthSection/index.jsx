import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import ButtonCapsule from "../ButtonCapsule";
import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function GrowthSection({ content }) {
  const classes = styles();
  const router = useRouter();

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
              <Grid className={classes.point}>
                {/* <Typography className={classes.pointText}> */}
                <Grid className={classes.pointLine}>
                  <img src={point.image} className={classes.pointCheck} />
                  {point.description}
                </Grid>
                {/* </Typography> */}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify={"center"} className={classes.bottomButton}>
        <ButtonCapsule text={"Get Started"} />
        {/* <Link href={"/signup"}>
        </Link> */}
      </Grid>
    </Grid>
  );
}

export default GrowthSection;
