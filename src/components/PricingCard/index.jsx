import { Box, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function PricingCard({ description, image }) {
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
          Did you know that a majority of solopreneurs spend more than 30% of
          their time in managing business execution chores?
        </Typography>
        <Typography gutterBottom variant="body1">
          It doesn’t have to be that hard for you. Partner with PayOrb and kick
          off your Solopreneur journey <b>The Smart Way!</b>
        </Typography>
        <Box className={classes.imgBox}>
          <img src={image} />
        </Box>
      </Box>
    </Box>
  );
}

export default PricingCard;
