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
    backgroundColor: "white",
    padding: "0.3em 4em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1em",
    },
  },
}));

export default CustomHeader;
