import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function LandingSectionCard({ image, title, description }) {
  const classes = styles();
  return (
    <Card className={classes.container}>
      <Grid
        className={classes.flexbox}
        container
        spacing={1}
        alignItems="center"
      >
        <Grid item style={{ width: "22.5%" }}>
          <img src={image} className={classes.logoImage} quality={"90"} />
        </Grid>
        <Grid item className={classes.textContainer}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LandingSectionCard;
