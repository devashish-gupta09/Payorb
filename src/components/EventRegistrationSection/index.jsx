import { Grid } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import LandingSectionContent from "../LandingSectionContent";

function EventRegistrationSection({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container alignItems={"stretch"}>
      <Grid container>
        <Grid item sm={4}>
          <LandingSectionContent
            description={content.description}
            sectionLogo={content.sectionLogo}
            sectionTitle={content.sectionTitle}
            title={content.title}
          />
        </Grid>
        <Grid container item sm={8} justify="center">
          <img src={content.image}></img>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EventRegistrationSection;