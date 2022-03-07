import { Grid, Typography } from "@material-ui/core";
import React from "react";
import SectionCard from "../LandingSectionCard";
import SectionContent from "../LandingSectionContent";
import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#00D4FF",
      height: "0.25em",
      width: "4em",
    }}
  />
);

function FeatureSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography variant="h4" className={classes.sectionTitle}>
        {content.title}
      </Typography>
      <ColoredLine />
      <Grid className={classes.container} container alignItems={"center"}>
        <Grid
          className={classes.desktop}
          container
          alignItems={"stretch"}
          spacing={3}
        >
          {content.features.map((feature, index) => {
            return (
              <Grid container item sm={6} key={index}>
                <SectionCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatureSection;
