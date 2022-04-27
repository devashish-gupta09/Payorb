import { makeStyles, Typography, Grid } from "@material-ui/core";
import React from "react";

import { appColors } from "../../../styles/colors";

function ValueCard({ title, subTitle, photo, bottomText, topBorderColor }) {
  const classes = styles({ topBorderColor });
  return (
    <Grid className={classes.foundation}>
      <Grid className={classes.container}>
        <Grid container>
          <Grid item xs={4}>
            <img src={photo} className={classes.img} />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.subTitle}>{subTitle}</Typography>
            <Typography className={classes.bottomText}>{bottomText}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  foundation: {
    padding: "1em 1em 0 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 1em 0",
    },
  },
  container: {
    padding: "1.5em 0.5em",
    height: "100%",
    borderTop: "0.3em solid",
    borderRadius: "0.4em",
    boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderTopColor: ({ topBorderColor }) => topBorderColor || "black",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 1em",
    },
  },
  spacing: {
    paddingRight: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
    },
  },
  title: {
    fontSize: "1.2em",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  subTitle: {
    fontSize: "0.8em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.3em",
      fontSize: "0.75em",
      fontWeight: "500",
    },
  },
  bottomText: {
    fontSize: "0.65em",
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.3em",
      fontSize: "0.6em",
      fontWeight: "500",
    },
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      justifySelf: "left",
      alignSelf: "center",
    },
  },
}));

export default ValueCard;
