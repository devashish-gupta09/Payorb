import { makeStyles, Typography, Grid } from "@material-ui/core";
import React from "react";

import { appColors } from "../../../styles/colors";
import DashboardCard from "../DashboardCard";

function ValueCard({ title, subTitle, photo, bottomText }) {
  const classes = styles();
  return (
    <DashboardCard rootClass={classes.container}>
      <Grid container spacing={"4"}>
        <Grid item xs={4} className={classes.spacing}>
          <img src={photo} className={classes.img}/>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.subTitle}>{subTitle}</Typography>
          <Typography className={classes.bottomText}>{bottomText}</Typography>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    padding: "1.5em 0.5em",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  spacing:{
    paddingRight:"1em",
    [theme.breakpoints.down("sm")]: {
      paddingRight:"0",
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
  img:{
    width:"110%",
    [theme.breakpoints.down("sm")]: {
      width:"100%",
      justifySelf:"left",
      alignItems:"center",
    },
  }
}));

export default ValueCard;
