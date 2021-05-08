import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";
import DashboardCard from "../DashboardCard";

function SkeletonLoading({ message }) {
  const classes = styles();
  return (
    <DashboardCard className={classes.root}>
      <Typography></Typography>
      <Skeleton count={5} duration={0.5}></Skeleton>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default SkeletonLoading;
