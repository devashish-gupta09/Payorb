import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

function AboutImageGrid() {
  const classes = styles();
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      justify="space-between"
    >
      {/* <Grid item sm={7}> */}
      <img
        className={classes.left}
        src={
          "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/about-section-assets%2FleftImage-compressed%20(2).jpg?alt=media&token=24c9f28d-84ef-4237-aadc-280cbf183d97"
        }
        // style={{ width: "90vw" }}
      ></img>
      {/* </Grid>
      <Grid item sm={5}> */}
      <img
        className={classes.right}
        src={
          "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/about-section-assets%2FRectangle%2079-compressed.jpg?alt=media&token=eb1ef13d-9e5e-418a-bd96-3f00598208fb"
        }
        // style={{ width: "90vw" }}
      ></img>
      {/* </Grid> */}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "4em 8em ",
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1em 2em 1em",
    },
  },
  detailContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  left: {
    width: "inherit",
    [theme.breakpoints.down("sm")]: {
      width: "95vw",
    },
  },
  right: {
    width: "inherit",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1em",
      width: "95vw",
    },
  },
}));

export default AboutImageGrid;
