import { Box } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import WhyChooseUsCard from "../WhyChooseUsCard";

function WhyUsCarousel() {
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
          <WhyChooseUsCard />
          <WhyChooseUsCard />
          <WhyChooseUsCard />
          <WhyChooseUsCard />
          <WhyChooseUsCard />
        </Carousel>
      </Box>
    </Box>
  );
}

export default WhyUsCarousel;
