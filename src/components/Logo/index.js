import { makeStyles } from "@material-ui/core";
import React from "react";

/* eslint-disable-next-line react/prop-types */
function Logo({ height, width, dark, className }) {
  const classes = styles();

  return (
    <img
      className={`${className} ${classes.logo}`}
      style={{ height, width: width }}
      src={dark ? "/assets/logoSvg.svg" : "/assets/logo.png"}
    />
  );
}

export const styles = makeStyles((theme) => ({
  logo: {
    width: "5%",
    [theme.breakpoints.down("sm")]: {
      width: "35%",
    },
  },
}));

export default Logo;
