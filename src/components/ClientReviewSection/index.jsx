import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { globalStyles } from "../../../styles/globalStyles";
import LandingSectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function ReviewContentSection({ review, name, classes }) {
  const globalStylesClasses = globalStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.carouselContentBodyContainer}
    >
      <Grid>
        <Typography
          paragraph
          variant="h4"
          className={`${classes.reviewTitle} ${globalStylesClasses.bold}`}
        >
          {review}
        </Typography>
        <Typography
          className={`${classes.nameTitle} ${globalStylesClasses.bold}`}
          variant="h6"
        >
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
}

function ClientReviewSection({ content }) {
  const classes = styles();
  return (
    <Grid container className={classes.container}>
      <Grid item sm={12}>
        <LandingSectionContent
          sectionTitle={content.sectionTitle}
          sectionLogo={content.sectionLogo}
          title={content.title}
        />
      </Grid>
      <Carousel
        fullHeightHover={false}
        stopAutoPlayOnHover={true}
        swipe={true}
        navButtonsProps={{
          className: `${classes.navButton}`,
        }}
        navButtonsWrapperProps={{
          className: `${classes.navButtonContainer}`,
        }}
        IndicatorIcon={<Grid></Grid>}
        indicatorIconButtonProps={{
          className: `${classes.carouselIndicatorIcon}`,
        }}
        activeIndicatorIconButtonProps={{
          className: `${classes.activeIndicator}`,
        }}
        
      >
        {content.clients.map((client, index) => {
          return (
            <Grid key={index} className={classes.carouselReviewContainer}>
              <Grid container className={classes.carouselReviewInnerContainer}>
                <Grid
                  container
                  className={classes.carouselReviewContentContainer}
                >
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    item
                    xs={4}
                  >
                    <img
                      className={classes.clientProfileImage}
                      src={client.image}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <ReviewContentSection
                      review={client.review}
                      name={client.name}
                      classes={classes}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Carousel>
    </Grid>
  );
}

export default ClientReviewSection;
