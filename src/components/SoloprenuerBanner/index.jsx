import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";

// import LandingCarousel from "../LandingCarousel";
import { styles } from "./styles";

function SolopreneurBanner({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
       <Grid className={classes.textContainer}>
            <Typography variant={"h2"} className={classes.titleSection}>
                {content.titleSection1}
                <Typography variant={"h2"} className={classes.aquaText}>
                {content.titleSection2}
                </Typography>
            </Typography>
            <Typography variant={"h6"} className={classes.descriptionText}>
            {content.description}
            </Typography>      
      </Grid>
      <Grid container className={classes.imgContainer} justifyContent={"center"}>
        
          <img src={content.image} alt="solopreneur-banner" className={classes.image} />
          <img src={content.imageMobile} alt="solopreneur-banner-mobile" className={classes.imageMobile} />
     </Grid>
    </Grid>
  );
}

export default SolopreneurBanner;