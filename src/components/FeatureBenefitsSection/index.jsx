import { Grid,Typography } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color:"black",
          backgroundColor:"black",
          height: "0.35vw",
          width:"15vw",
      }}
  />
);
function FeatureBenefitsSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container alignItems={"stretch"}>
      <Grid container>
        <Grid item sm={4} className={classes.title}>
          <img src="/assets/features/FeatureSection31.svg" style={{position:"absolute",zIndex: "-1"}}/>
          <Typography className={classes.mainTitle} variant="h2">
            {content.title}
          </Typography>
          <Grid className={classes.coloredLine}>
          <ColoredLine color="black"></ColoredLine>
          </Grid>
        </Grid>
        <Grid container item sm={8} className={classes.description} alignItems={"center"} justify={"center"}>
          <img src="/assets/features/FeatureSection3.svg" style={{position:"absolute",margin:"0 auto",opacity:"0.8",}}/>
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
