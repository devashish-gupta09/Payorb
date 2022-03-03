import { Grid,Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import SectionCard from "../LandingSectionCard";
import SectionContent from "../LandingSectionContent";
import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color:"#00D4FF",
          backgroundColor:"#00D4FF",
          height: "0.35vw",
          width:"6vw",
      }}
  />
);

function FeatureSection({ content }) {
  const classes = styles();
  return (
    <Grid  style={{backgroundColor:"#F5FBFE"}}>
      {/* <Grid container className={classes.paragraphContainer}>
        <Typography className={classes.description}>
          {content.topPara}
        </Typography>
        <Typography className={classes.description}>
          {content.bottomPara}
        </Typography>
      </Grid> */}
      <Typography  variant="h4" className={classes.sectionTitle}>
        {content.title}
      </Typography >
      <ColoredLine color="blue"/>
      <img src="./assets/features/VectorImgEarth1.svg" className={classes.img} />
      <img src="./assets/features/VectorImgEarth2.svg" className={classes.img2}/>
      <Grid className={classes.container} container alignItems={"stretch"}>
      {/* Removing the Features Title from the grid
      <Grid item sm={4}>
          <SectionContent
            sectionLogo={content.sectionLogo}
            sectionTitle={content.sectionTitle}
            title={content.title}
            description={content.description}
          />
       </Grid>*/}

        <Grid container item sm={10} justify={"center"}>
         {/*<Grid className={classes.mobile}>
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
          </Grid>*/ } 
      
          <Grid
            className={classes.desktop}
            container
            alignItems={"stretch"}
            spacing={3}
          >
            {content.features.map((feature, index) => {
              return (
                <Grid container item sm={6} key={index}>
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