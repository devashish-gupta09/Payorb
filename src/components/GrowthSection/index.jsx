import { Grid, Link } from "@material-ui/core";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import { event, SIGNUP_CLICK } from "../../utils/ga";

import ButtonCapsule from "../ButtonCapsule";
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
        <Link href={PAGE_PATHS.SIGNUP}>
          <ButtonCapsule
            onClick={() =>
              event({ action: SIGNUP_CLICK, params: { location: "footer" } })
            }
            text={"Get Started"}
          />
        </Link>
      </Grid>
    </Grid>
  );
}

export default GrowthSection;
