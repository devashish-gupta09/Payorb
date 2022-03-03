import { Grid } from "@material-ui/core";
import React from "react";

import Carousel from "react-material-ui-carousel";

import SectionCard from "../LandingSectionCard";
import SectionContent from "../LandingSectionContent";
import { styles } from "./styles";

function FeatureSection({ content }) {
  const classes = styles();

  return (
    <Grid className={classes.container} container alignItems={"stretch"}>
      {/* <Grid container className={classes.paragraphContainer}>
        <Typography className={classes.description}>
          {content.topPara}
        </Typography>
        <Typography className={classes.description}>
          {content.bottomPara}
        </Typography>
      </Grid> */}
      <Grid container>
        <Grid item sm={4}>
          <SectionContent
            sectionLogo={content.sectionLogo}
            sectionTitle={content.sectionTitle}
            title={content.title}
            description={content.description}
          />
        </Grid>
        <Grid container item sm={8} justify={"center"}>
          <Grid className={classes.mobile}>
            <Carousel
              className={classes.carousel}
              navButtonsProps={{ className: `${classes.navButton}` }}
              autoPlay={false}
              IndicatorIcon={<Grid></Grid>}
              indicatorIconButtonProps={{
                className: `${classes.carouselIndicatorIcon}`,
              }}
              activeIndicatorIconButtonProps={{
                className: `${classes.activeIndicator}`,
              }}
              indicatorContainerProps={{
                className: `${classes.indicatorButtonContainer}`,
              }}
            >
              {content.features.map((feature, index) => {
                return (
                  <Grid
                    container
                    style={{
                      width: "90vw",
                      height: "30vh",
                      borderRadius: "2em",
                    }}
                    key={index}
                  >
                    <SectionCard
                      key={index}
                      image={feature.image}
                      title={feature.title}
                      description={feature.description}
                    />
                  </Grid>
                );
              })}
            </Carousel>
          </Grid>

          <Grid
            className={classes.desktop}
            container
            alignItems={"stretch"}
            spacing={4}
          >
            {content.features.map((feature, index) => {
              return (
                <Grid container item sm={4} key={index}>
                  <SectionCard
                    image={feature.image}
                    title={feature.title}
                    description={feature.description}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatureSection;
