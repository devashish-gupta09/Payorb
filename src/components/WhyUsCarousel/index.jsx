import { makeStyles } from "@material-ui/styles";
import React from "react";
import {Button} from "@material-ui/core";
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

const CustomButtonGroup = ({ next, previous, goToSlide, carouselState }) => {
  const { totalItems, currentSlide } = carouselState;
  const classes = styles();
  return (
    <div className="custom-button-group">
      <img src="/assets/whyChooseUs/prevButton.svg"  onClick={() => previous()} className={classes.button}/>
      <img src="/assets/whyChooseUs/nextButton.svg"  onClick={() => next()} className={classes.button}/>
    </div>
  );
};

function WhyUsCarousel({ testimonies }) {
  const classes = styles();
  return (
    <Carousel
      className={classes.container}
      swipeable={true}
      draggable={true}
      //showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      // keyBoardControl={true}
      // transitionDuration={1000}
      //removeArrowOnDeviceType={["tablet", "mobile"]}
      arrows={false}
      customButtonGroup={<CustomButtonGroup/>}
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
 button:{
  width:"2em",
  margin:"0.8em",
  
  "&:hover": {
    transform:"scale(1.3)",
  },
  [theme.breakpoints.down("sm")]: {
    margin:"0.5em",
  },
 }
}));
export default WhyUsCarousel;
