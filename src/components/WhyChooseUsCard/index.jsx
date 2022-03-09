import { Box, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function WhyChooseUsCard() {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Box className={classes.profile}>
        <img src="/assets/whyChooseUs/avatar.svg" alt="Avatar" />
      </Box>
      <Box className={classes.card}>
        <Box className={classes.head}>
          <Typography variant="h6" className={classes.name}>
            James Pattinson
          </Typography>
        </Box>
        <Box className={classes.body}>
          <Typography variant="body1" className={classes.description}>
            “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque risus
            tortor donec ipsum consequat semper consequat adipiscing ultrices.”
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WhyChooseUsCard;
