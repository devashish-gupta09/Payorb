import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";

function AboutDetail() {
  const theme = useTheme();
  return (
    <Grid container className={classes.root}>
      <Grid container item sm={6} alignItems="center">
        <Typography variant="h3">About Us</Typography>
      </Grid>
      <Grid
        item
        sm={6}
        className={classes.imageContainer}
        container
        justify="center"
        alignItems="center"
      >
       <Typography 
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
  },
  detailContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
}));

export default AboutDetail;
