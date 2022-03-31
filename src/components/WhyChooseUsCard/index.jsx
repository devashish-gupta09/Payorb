import { Box, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function WhyChooseUsCard({ testimony }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Box className={classes.profile}>
        <img src={testimony.img} alt="Avatar" className={classes.profileImg} />
      </Box>
      <Box className={classes.card}>
        <Box className={classes.head}>
          <Typography variant="h6" className={classes.name}>
            {testimony.name}
          </Typography>
        </Box>
        <Box className={classes.body}>
          <Typography variant="body1" className={classes.description}>
            {testimony.content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WhyChooseUsCard;
