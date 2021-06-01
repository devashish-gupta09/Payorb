import { makeStyles } from "@material-ui/core";
import React from "react";

function Capsule({ children }) {
  const classes = style();
  return (
    <div className={classes.root}>
      <div className={classes.capsule}>{children}</div>
    </div>
  );
}

const style = makeStyles((theme) => ({
  root: {
    padding: "0 0.2em",
  },
  capsule: {
    width: "fit-content",
    background: "#79DFDF",
    borderRadius: "1.5em",
    padding: "0.3em 0.8em",
    fontWeight: "bold",
    color: "white",
    fontSize: "0.9em",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "500",
    },
  },
}));

export default Capsule;
