import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function WorkCards({ title, description, image }) {
  const classes = styles();
  return (
    <Box className={classes.container}>
      <Grid className={classes.imgBox}>
        <img src={image} height={80} width={80} className={classes.img} />
      </Grid>
      <Box className={classes.box}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </Box>
    </Box>
  );
}

export default WorkCards;
