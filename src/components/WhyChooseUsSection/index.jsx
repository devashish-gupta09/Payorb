import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import WhyUsCarousel from "../WhyUsCarousel";

import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#000000",
      height: "0.25em",
      width: "4em",
    }}
  />
);

function WhyChooseUsSection({ content }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Typography variant="h2" className={classes.heading} align="center">
        {content.title}
      </Typography>
      <ColoredLine />
      <Typography
        variant="body1"
        className={classes.description}
        align="center"
      >
        {content.subtitle}
      </Typography>
      <WhyUsCarousel />
    </Box>
  );
}

export default WhyChooseUsSection;
