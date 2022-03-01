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
    padding: "6em 8em 8em 8em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "10em",
    },
  },
  imageContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0 0 0",
      justifyContent: "flex-start !important",
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