import { Grid } from "@material-ui/core";
import React from "react";
import SectionCard from "../LandingSectionCard";
import SectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function FeatureSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container alignItems={"stretch"}>
      <Grid container>
        <Grid item sm={4}>
          <SectionContent
            sectionLogo={content.sectionLogo}
            sectionTitle={content.sectionTitle}
            title={content.title}
          />
        </Grid>
        <Grid container item sm={8}>
          <Grid container alignItems={"stretch"} spacing={4}>
            {content.features.map((feature, index) => {
              return (
                <Grid container item sm={4} key={index}>
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
    </Grid>
  );
}

export default FeatureSection;
