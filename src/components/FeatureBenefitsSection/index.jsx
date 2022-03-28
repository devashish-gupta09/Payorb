import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "black",
      backgroundColor: "black",
      height: "0.35vw",
      width: "15vw",
    }}
  />
);
function FeatureBenefitsSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container>
      <Grid
        item
        sm={4}
        className={classes.title}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={classes.mainTitle}>{content.title}</Typography>
        <Grid className={classes.coloredLine}></Grid>
      </Grid>
      <Grid
        container
        item
        sm={8}
        className={classes.description}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          style={{
            fontSize: "0.85em",
            fontWeight: "500",
          }}
        >
          <p>{content.contentSection1}</p>
          <p>{content.contentSection2}</p>
          <p>{content.contentSection3}</p>
          <p>{content.contentSection4}</p>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FeatureBenefitsSection;
