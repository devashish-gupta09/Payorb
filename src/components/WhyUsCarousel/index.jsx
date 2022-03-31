import { Box } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";

import WhyChooseUsCard from "../WhyChooseUsCard";

function WhyUsCarousel({ testimonies }) {
  return (
    <Box>
      <Box className="carousel-container">
        <Carousel
          infiniteLoop
          autoPlay
          useKeyboardArrows
          centerMode
          dynamicHeight
        >
          {testimonies.map((testimony, index) => (
            <WhyChooseUsCard key={index} testimony={testimony} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

export default WhyUsCarousel;
