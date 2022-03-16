import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function SigningBanner({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container}>
      <Grid
        className={classes.imageContainer}
        container
        justify="center"
        alignItems="center"
      >
        {/* <img className={classes.image} src={"../assets/signing.png"}></img> */}
      </Grid>

      <div className={classes.titleSectionContainer}>
        <Grid container>
          <Typography variant="h4" className={`${classes.titleSection}`}>
            {content.titleSection1}&nbsp;
          </Typography>
          <Typography
            variant="h4"
            className={`${classes.titleSection} ${classes.boldText}`}
          >
            {`${content.titleSection2}`}
          </Typography>
        </Grid>
      </div>
    </Grid>
  );
}

export default SigningBanner;
