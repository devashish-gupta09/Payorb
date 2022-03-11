import { Grid, Typography, Card, Button } from "@material-ui/core";
import React from "react";
import SolopreneurSuccessCards from "../SolopreneurSuccessCards";
import { styles } from "./styles";
import Carousel from "react-material-ui-carousel";

function SolopreneurSuccess({ content }) {
  const classes = styles();

  return (
    <Grid className={classes.outerContainer} container>
      {/* This is for the title*/}

      <Grid className={classes.container} container>
        <Grid
          className={classes.title}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" className={classes.mainTitle}>
            {content.title}
          </Typography>
        </Grid>

        <hr className={classes.divider} />

        {/* This is for the desktop display of the cards*/}

        <Grid container className={classes.desktop} spacing={"2"}>
          {/* This is for the banner story of the cards*/}
          <Card className={classes.bannerContainer}>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              spacing="2"
              justify={"space-evenly"}
            >
              <Grid item sm={6} className={classes.bannerText}>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.headline}
                >
                  {content.bannerStory.headline}
                </Typography>
                <Typography variant="body2" className={classes.descriptionText}>
                  {content.bannerStory.description}
                </Typography>
                <Grid
                  className={classes.buttonContain}
                  justify={"space-between"}
                >
                  <Button size="small" className={classes.date}>
                    {content.bannerStory.date}
                  </Button>
                  <Button
                    size="small"
                    className={classes.readMore}
                    justifyContent={"right"}
                  >
                    Read More
                  </Button>
                </Grid>
              </Grid>
              <Grid item sm={4}>
                <img
                  object-fit="cover"
                  src={content.bannerStory.image}
                  alt="cover-page"
                />
              </Grid>
            </Grid>
          </Card>
          <Grid container className={classes.multipleCards} spacing={"4"}>
            {/* This is for the multiple stories inside the cards*/}
            {content.stories.slice(0, 3).map((story, index) => {
              return (
                <Grid key={index} item sm={4}>
                  <SolopreneurSuccessCards
                    image={story.image}
                    headline={story.headline}
                    description={story.description}
                    date={story.date}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.mobileView}
          alignItems="center"
          justifyContent="center"
          spacing={"2"}
        >
          <Carousel
            interval={2500}
            fullHeightHover={false}
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: "black",
                opacity: "0.2",
                borderRadius: "em",
                margin: "-2em 1.5 0 1.5",
              },
            }}
          >
            {content.stories.map((story, index) => {
              return (
                <Grid key={index} item sm={4}>
                  <SolopreneurSuccessCards
                    image={story.image}
                    headline={story.headline}
                    description={story.description}
                    date={story.date}
                  />
                </Grid>
              );
            })}
          </Carousel>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SolopreneurSuccess;
