import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function PolicyWebDisclamier() {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography varaint={"h3"}>Web Disclaimer.</Typography>
    </Grid>
  );
}

const styles = makeStyles(() => ({
  root: {
    paddingTop: "2em",
    paddingBottom: "3em",
  },
}));

export default PolicyWebDisclamier;
