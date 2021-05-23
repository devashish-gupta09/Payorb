import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function LandingSectionCard({ image, title, description }) {
  const classes = styles();
  return (
    <Card className={classes.container}>
      <Grid className={classes.logo} container justify="center">
        <img className={classes.image} src={image}></img>
      </Grid>

      <Typography className={classes.title} variant="h6" align="center">
        {title}
      </Typography>
      <Typography className={classes.description}>{description}</Typography>
    </Card>
  );
}

export default LandingSectionCard;
