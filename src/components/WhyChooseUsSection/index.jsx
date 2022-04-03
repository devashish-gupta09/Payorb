import { Box, Typography } from "@material-ui/core";
import React from "react";

import WhyUsCarousel from "../WhyUsCarousel";

import { styles } from "./styles";

const ColoredLine = () => (
  <hr
    style={{
      border: "0",
      backgroundColor: "#000000",
      height: "0.25em",
      margin: "1em 0",
      width: "5em",
    }}
  />
);

function WhyChooseUsSection({ content }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Typography variant="h3" className={classes.heading} align="center">
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
      <WhyUsCarousel testimonies={content.testimonies} />
    </Box>
  );
}

export default WhyChooseUsSection;
