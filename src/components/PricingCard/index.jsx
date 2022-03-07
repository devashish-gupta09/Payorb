import { Box, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function PricingCard({ description, image }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Box className={classes.head}>
        <Typography variant="h4" className={classes.heading1}>
          Your carrier
        </Typography>
        <Typography variant="h4" className={classes.heading2}>
          Starts here
        </Typography>
      </Box>
      <Box className={classes.description}>
        <Typography variant="body1">{description}</Typography>
        <Box className={classes.imgBox}>
          <img src={image} />
        </Box>
      </Box>
    </Box>
  );
}

export default PricingCard;
