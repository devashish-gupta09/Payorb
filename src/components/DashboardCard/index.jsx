import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../theme";

const styles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
    borderRadius: "0.8em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 0.5em",
    },
  },
}));

export default function DashboardCard({ props, rootClass, children }) {
  const classes = styles();
  return (
    <Card {...props} className={rootClass ? rootClass : classes.root}>
      {" "}
      {children}
    </Card>
  );
}
