import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";

function AboutDetail() {
  const theme = useTheme();
  const classes = styles();
  return (
    <Grid container className={classes.root}>
      <Grid container item sm={6} alignItems="center">
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
      </Grid>
      <Grid item sm={6} container justify="center" alignItems="center">
        <Typography align="justify" className={classes.aboutUsDescription}>
          Our vision at PayOrb is to make freelancing a smooth route to success
          for you. We aspire to make PayOrb a runway for all freelance and small
          service based businesses, relying on which they can start something
          new and take off to greater heights.
          <br></br>
          <br></br>Our team is dedicated to building an ecosystem that manages
          your appointments, billing records, client database, feedback
          mechanism and so much more!
        </Typography>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "8em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
  },
  detailContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  aboutUsDescription: {
    color: "#828282",
  },
}));

export default AboutDetail;
