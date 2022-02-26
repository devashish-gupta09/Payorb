import { AppBar, makeStyles } from "@material-ui/core";
import React from "react";

function CustomHeader({ children }) {
  const classes = styles();
  return (
    <AppBar className={classes.root} position={"sticky"}>
      {children}
    </AppBar>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    padding: "1rem 2.5em 0.5rem 2.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1em",
    },
    boxShadow: "none",
  },
}));

export default CustomHeader;
