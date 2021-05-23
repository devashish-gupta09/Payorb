import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";

function AboutBanner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = styles();
  return (
    <Grid container className={classes.root}>
      <Grid container item sm={6} alignItems="center">
        {!matches ? (
          <Grid>
            <Typography variant={"h3"}>One Platform.</Typography>
            <Typography variant={"h3"}>Infinite Opportunities.</Typography>
          </Grid>
        ) : (
          <img className={classes.image} src={"../assets/signing.png"}></img>
        )}
      </Grid>
      <Grid
        item
        sm={6}
        className={classes.imageContainer}
        container
        justify="center"
        alignItems="center"
      >
        {matches ? (
          <Grid>
            <Typography variant={"h3"}>One Platform.</Typography>
            <Typography variant={"h3"}>Infinite Opportunities.</Typography>
          </Grid>
        ) : (
          <img className={classes.image} src={"../assets/signing.png"}></img>
        )}
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
  },
  imageContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  image: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default AboutBanner;
