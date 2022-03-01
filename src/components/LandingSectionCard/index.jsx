import { Card, Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import React from "react";

import { styles } from "./styles";

function LandingSectionCard({ image, title, description }) {
  const classes = styles();
  return (
    <Card className={classes.container}>
      <Grid className={classes.flexbox} container spacing={2}>
        <Grid item sm={6}>
        <Grid className={classes.logo} container justify="center">
          {/* <img className={classes.image} src={image}></img> */}
          <Image src={image} height={65} width={65} quality={"75"}></Image>
        </Grid>
        </Grid>
        <Grid item sm={6}>
        <Typography className={classes.title} variant="h6" align="center">
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
