import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { styles } from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "#00D4FF",
      backgroundColor: "#00D4FF",
      height: "0.30vw",
      width: "7vw",
      marginBottom:"1em",
    }}
  />
);
function AboutVision({ content }) {
  const classes = styles();
  return (
    <Grid className={classes.container} container >
      <Grid className={classes.title} container alignItems="center" justifyContent="center">
        <Typography variant="h4" className={classes.mainTitle}>
          {content.title}
        </Typography>
      </Grid>
      <ColoredLine />
      <Grid container className={classes.description} alignItems={"center"} justifyContent={"center"}>
        <Typography>
          <p>{content.para1}</p>
          <p>{content.para2}</p>
          <p>{content.para3}</p>
          <Typography className={classes.desktop}>
          <p>{content.para4}</p>
          </Typography>
        </Typography>
      </Grid>

    </Grid >
  );
}

export default AboutVision;
