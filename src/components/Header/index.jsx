import { AppBar, makeStyles } from "@material-ui/core";
import React from "react";

function CustomHeader({ children }) {
  const classes = styles();
  return (
    <AppBar className={classes.root} position="relative">
      {children}
    </AppBar>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    padding: "1rem 2.5em 0.5rem 2.5em",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1301",
      position: "fixed",
      top: "0",
      backgroundColor: "white",
      padding: "0.5em 1em",
    },
    boxShadow: "none",
  },
}));

export default CustomHeader;
