import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";
import Carousel from "react-material-ui-carousel";

function AboutAdvisors({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container justifyContent="center">
      {/*Title*/}
      <Grid
        className={classes.title}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" className={classes.mainTitle}>
          Advisors
        </Typography>
      </Grid>

      <hr className={classes.divider} />

      <Grid container className={classes.advisorCarouselMobile}>
        <Carousel
          interval={2500}
          fullHeightHover={false}
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              backgroundColor: "black",
              opacity: "0.2",
              borderRadius: "2em",
              marginTop: "-2em",
            },
          }}
        >
          {content.details.map((advisor, index) => {
            return (
              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  className={classes.imgContainer}
                  justifyContent={"center"}
                >
                  <img src={advisor.image} className={classes.img} />
                </Grid>
                <Grid item className={classes.advisor}>
                  <Typography className={classes.advisorName}>
                    {advisor.name}{" "}
                  </Typography>
                  <Typography className={classes.advisorTitle}>
                    {" "}
                    {advisor.title}{" "}
                  </Typography>
                  <Typography className={classes.advisorDescription}>
                    {" "}
                    {advisor.description}{" "}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Carousel>
      </Grid>

      {/*Array of advisors with their images, title and description mapped*/}
      <Grid container className={classes.advisorContainer} spacing={4}>
        {content.details.map((advisor, index) => {
          return (
            <Grid key={index} item sm={4}>
              <Grid className={classes.imgContainer}>
                <img src={advisor.image} />
              </Grid>
              <Grid className={classes.advisor}>
                <Typography className={classes.advisorName}>
                  {advisor.name}{" "}
                </Typography>
                <Typography className={classes.advisorTitle}>
                  {" "}
                  {advisor.title}{" "}
                </Typography>
                <Typography className={classes.advisorDescription}>
                  {" "}
                  {advisor.description}{" "}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default AboutAdvisors;
