import { Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme) => ({
  root: {
    padding: "4em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 0.5em",
    },
  },
  border: {
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.4em",
    },
  },
}));

export default function DashboardCard({ props, rootClass, children }) {
  const classes = styles();
  return (
    <Grid
      {...props}
      className={`${rootClass ? rootClass : classes.root} ${classes.border}`}
    >
      {children}
    </Grid>
  );
}
