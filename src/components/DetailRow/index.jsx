import { Grid } from "@material-ui/core";
import React from "react";

function DetailRow({ icon, classes, children }) {
  return (
    <Grid container className={classes.infoRow} alignItems="center">
      <Grid item xs={1} className={classes.logo}>
        {icon}
      </Grid>
      <Grid item xs={11}>
        {children}
      </Grid>
    </Grid>
  );
}

export default DetailRow;
