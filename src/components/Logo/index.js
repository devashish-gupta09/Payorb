import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

/* eslint-disable-next-line react/prop-types */
function Logo({ height, width, dark, className, redirectToHome }) {
  const classes = styles();
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <img
      className={`${className} ${classes.logo}`}
      style={{
        height,
        width: width,
        cursor: redirectToHome ? "pointer" : "auto",
      }}
      src={dark ? "/assets/logoSvg.svg" : "/assets/logo.png"}
      onClick={redirectToHome ? handleClick : null}
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
