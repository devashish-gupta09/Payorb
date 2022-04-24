import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function PricingCard({ image }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Box className={classes.head}>
        <Typography variant="h5" className={classes.heading1}>
          Choose Solopreneurship
        </Typography>
        <Typography variant="h5" className={classes.heading2}>
          the Smart Way
        </Typography>
        <Typography variant="h5" className={classes.heading1}>
          not the hard way!
        </Typography>
      </Box>
      <Box className={classes.description}>
        <Typography gutterBottom variant="body1">
          Did you know that a majority of solopreneurs spend more than 30% of
          their time in managing business execution chores?
        </Typography>
        <Typography gutterBottom variant="body1">
          Did you know that more than 20% of Solopreneurs consider shutting down
          their business within one year of starting?
        </Typography>
        <Typography gutterBottom variant="body1">
          It doesn’t have to be that hard for you. Partner with PayOrb and kick
          off your Solopreneur journey <b>The Smart Way!</b>
        </Typography>
        <Grid container alignItems="center" justifyContent="center">
          <img src={image} />
        </Grid>
      </Box>
    </Box>
  );
}

export default PricingCard;
