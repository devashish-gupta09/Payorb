import { makeStyles } from "@material-ui/core";
import React from "react";

function Capsule({ children, bgColor }) {
  const classes = style({ bgColor });
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
    background: ({ bgColor }) => (bgColor ? bgColor : "#79DFDF"),
    borderRadius: "1.5em",
    padding: "0.75em 1.5em",
    color: "white",
    fontSize: "0.9em",
    textTransform: "capitalize",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontWeight: "500",
      fontSize: "0.65em",
      padding: "1em 0.5em",
      marginTop: "1em",
    },
  },
}));

export default Capsule;
