import { Grid } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";

import { styles } from "./styles";

function LandingCarousel({ urls }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Carousel
        navButtonsAlwaysVisible={false}
        IndicatorIcon={<Grid></Grid>}
        indicatorIconButtonProps={{
          className: `${classes.indicatorButton}`,
        }}
        activeIndicatorIconButtonProps={{
          className: `${classes.activeIndicator}`,
        }}
        indicatorContainerProps={{
          className: `${classes.indicatorButtonContainer}`,
        }}
        autoPlay={false}
        navButtonsProps={{
          className: `${classes.navButtons}`,
        }}
      >
        {urls.map((url, index) => {
          return (
            <div
              key={index}
              className={classes.carouselImage}
              style={{
                background: `linear-gradient(89.91deg, rgba(0, 0, 0, 0.79) 3.64%, rgba(0, 0, 0, 0.78) 28.9%, rgba(0, 0, 0, 0) 99.93%), url(${url}) no-repeat`,
              }}
            ></div>
          );
        })}
      </Carousel>
    </Grid>
  );
}

export default LandingCarousel;
