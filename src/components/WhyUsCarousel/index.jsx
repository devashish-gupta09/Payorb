import { makeStyles } from "@material-ui/styles";
import React from "react";
import Carousel from "react-multi-carousel";

import WhyChooseUsCard from "../WhyChooseUsCard";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    // slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    // slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

function WhyUsCarousel({ testimonies }) {
  const classes = styles();
  return (
    <Carousel
      className={classes.container}
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      // keyBoardControl={true}
      // transitionDuration={1000}
      // containerClass={"carousel-container"}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass={classes.itemClass}
      renderButtonGroupOutside={true}
    >
      <WhyChooseUsCard testimony={testimonies[0]} />
      <WhyChooseUsCard testimony={testimonies[1]} />
      <WhyChooseUsCard testimony={testimonies[2]} />
      {/* <WhyChooseUsCard testimony={testimonies[2]} />
      <WhyChooseUsCard testimony={testimonies[2]} />
      <WhyChooseUsCard testimony={testimonies[2]} /> */}
    </Carousel>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  itemClass: {
    margin: "20px 0",
  },
}));
export default WhyUsCarousel;
