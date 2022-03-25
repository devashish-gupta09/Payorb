import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { styles } from "./styles";

function AboutFounders({ content }) {
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
          Founders
        </Typography>
      </Grid>

      <hr className={classes.divider} />

      {/*Array of founders with their images, title and description mapped*/}
      <Grid container className={classes.founderContainer}>
        {content.details.map((founder, index) => {
          return (
            <Grid key={index} item sm={6}>
              <Grid className={classes.founder}>
                <img src={founder.image} />
                <Typography className={classes.founderName}>
                  {founder.name}{" "}
                </Typography>
                <Typography className={classes.founderTitle}>
                  {" "}
                  {founder.title}{" "}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default AboutFounders;
