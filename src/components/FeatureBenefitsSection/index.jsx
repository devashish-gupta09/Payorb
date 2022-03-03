import { Grid,Typography } from "@material-ui/core";
import React from "react";

import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function FeatureBenefitsSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container alignItems={"stretch"}>
      <Grid container>
        <Grid item sm={4} className={classes.title}>
        <img src="/assets/features/FeatureSection31.svg" style={{position:"absolute",zIndex: "-1"}}/>
          <LandingSectionContent
            title={content.title}
          />
        </Grid>
        <Grid container item sm={8} justify="center" className={classes.description}>
        <img src="/assets/features/FeatureSection3.svg" style={{position:"absolute",margin:"0 auto", verticalAlign:"middle"}}/>
          <Typography>
              <p>{content.contentSection1}</p>
              <p>{content.contentSection2}</p>
              <p>{content.contentSection3}</p>
          </Typography>
          <Typography className={classes.desktop}>
              {content.contentSection4}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatureBenefitsSection;
