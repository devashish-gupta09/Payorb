import { Card, Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import React from "react";

import { styles } from "./styles";

function LandingSectionCard({ image, title, description }) {
  const classes = styles();
  return (
    <Card className={classes.container}>
      <Grid className={classes.flexbox} container spacing={1} alignItems="center" >
        <Grid item xs={2}>
          <Grid className={classes.logo} container justifyContent={"center"} alignItems="center">
            <img src={image} className={classes.logoImage} quality={"75"} />
          </Grid>
        </Grid>
        <Grid item xs={10} className={classes.textContainer}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          {description && (
            <Typography className={classes.description}>{description}</Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default LandingSectionCard;
