import { makeStyles, Typography,Grid } from "@material-ui/core";
import React from "react";

import { appColors } from "../../../styles/colors";
import DashboardCard from "../DashboardCard";

function ValueCard({ title, subTitle,photo,bottomText }) {
  const classes = styles();
  return (
    <DashboardCard rootClass={classes.container}>
      <Grid container>
        <Grid item xs={4} >
        <img src={photo}/>
        </Grid>
        <Grid item xs={8} >
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
    padding: "1.5em 1em",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  title: {
    fontSize: "1.4em",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  subTitle: {
    fontSize: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.3em",
      fontSize: "0.75em",
      fontWeight: "500",
    },
  },
  bottomText:{
    fontSize: "0.65em",
    color:appColors.grey,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.3em",
      fontSize: "0.6em",
      fontWeight: "500",
    },
  }
}));

export default ValueCard;
