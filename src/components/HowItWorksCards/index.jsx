import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function WorkCards({ title, description, image }) {
  const classes = styles();
  return (
    <Grid container className={classes.container}>
      <Grid item sm={3}>
        <img src={image} className={classes.img} />
      </Grid>
      <Grid item sm={9}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </Grid>
    </Grid>
  );
}

export default WorkCards;
