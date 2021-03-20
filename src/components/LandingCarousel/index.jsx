import { Grid } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";

function LandingCarousel({ urls }) {
  return (
    <Grid style={{ height: "90vh" }}>
      <Carousel
        navButtonsAlwaysVisible={false}
        IndicatorIcon={<Grid></Grid>}
        indicatorIconButtonProps={{
          style: {
            borderRadius: "0.2em",
            height: "0.3em",
            width: "2em",
            backgroundColor: "grey",
            margin: "0 0.3em",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: "rgba(0, 221, 188, 1)",
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "-4em", // 5
            padding: "1em 8em 1em 0em ",
            textAlign: "right", // 4
          },
        }}
        autoPlay={false}
      >
        {urls.map((url) => {
          return (
            <div
              style={{
                background: `linear-gradient(89.91deg, rgba(0, 0, 0, 0.79) 3.64%, rgba(0, 0, 0, 0.78) 28.9%, rgba(0, 0, 0, 0) 99.93%), url(${url}) no-repeat`,
                height: "91vh",
                width: "100vw",
                backgroundSize: "100%",
              }}
            ></div>
          );
        })}
      </Carousel>
    </Grid>
  );
}

export default LandingCarousel;
