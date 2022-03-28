import { Box, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function FeatureSectionHomeCard({ image, title, description }) {
  const classes = styles();
  return (
    <Box className={classes.flexbox} alignItems="center">
      <Box
        className={classes.logo}
        justifyContent={"center"}
        alignItems="center"
      >
        <img src={image} className={classes.logoImage} quality={"90"} />
      </Box>
      <Box item xs={10} className={classes.textContainer}>
        <Typography className={classes.title}>{title}</Typography>
        {description && (
          <Typography className={classes.description}>{description}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default FeatureSectionHomeCard;
