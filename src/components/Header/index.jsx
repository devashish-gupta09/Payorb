import { AppBar, makeStyles } from "@material-ui/core";
import React from "react";

function CustomHeader({ children, bgColor = "white" }) {
  const classes = styles({ bgColor });
  return (
    <AppBar className={classes.root} position="relative">
      {children}
    </AppBar>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: ({ bgColor }) => bgColor,
    padding: "0.15% 2.5em 0.15% 2.5em",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1301",
      position: "fixed",
      top: "0",
      // backgroundColor: "white",
      padding: "0.5em 1em",
      // marginBottom: "5em",
    },
    boxShadow: "none",
  },
}));

export default CustomHeader;
