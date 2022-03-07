import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "black",
      backgroundColor: "black",
      height: "0.30vw",
      width: "7em",
      marginBottom:"1em",
    }}
  />
);
function AboutStoryPayOrb({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.outerContainer} container>
    <Grid className={classes.container} container >
      <Grid className={classes.title} container alignItems="center" justifyContent="center">
        <Typography variant="h4" className={classes.mainTitle}>
          {content.title}
        </Typography>
      </Grid>
      <ColoredLine />
      <Grid container className={classes.description} alignItems={"center"} justifyContent={"center"}>
        <Typography>
          <p>{content.section1}</p>
          <p>{content.section2}</p>
          <p>{content.section3}</p>
          <Typography className={classes.desktop}>
          <p>{content.section4}</p>
          </Typography>
        </Typography>
      </Grid>
    </Grid >
    </Grid>
  );
}

export default AboutStoryPayOrb;
