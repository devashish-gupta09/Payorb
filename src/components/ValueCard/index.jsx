import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { appColors } from "../../../styles/colors";
import DashboardCard from "../DashboardCard";

function ValueCard({ title, subTitle }) {
  const classes = styles();
  return (
    <DashboardCard rootClass={classes.container}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.subTitle}>{subTitle}</Typography>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    padding: "2.5em 1em",
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
    color: appColors.grey,
  },
}));

export default ValueCard;
