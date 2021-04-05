import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import DashboardCard from "../DashboardCard";
import React from "react";
import { AccountCircle } from "@material-ui/icons";
import { reviews } from "./mockValues";
import { globalStyles } from "../../../styles/globalStyles";
import { appColors } from "../../../styles/colors";

function ProfileReviewSection() {
  const classes = styles();
  const globalClasses = globalStyles();

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid container>
        {reviews.map((review) => {
          return (
            <Grid container className={classes.infoRow}>
              <Grid container item xs={10}>
                <Avatar>
                  <AccountCircle></AccountCircle>
                </Avatar>
                <Grid className={classes.infoRowRoot}>
                  <Typography>{review.review}</Typography>
                  <Typography
                    className={`${globalClasses.bold500} ${classes.reviewerLabel}`}
                  >
                    {review.reviewer}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right" className={classes.reviewTime}>
                  1d ago
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  root: {
    borderRadius: "0.8em",
    padding: "1.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
    },
  },
  infoRowRoot: { paddingLeft: "1em", width: "80%" },
  infoRow: {
    padding: "1em 0",
    width: "100%",
    borderBottom: "2px",
    borderColor: "black",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
      fontSize: "0.75em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
    paddingTop: "0.5em",
  },
  reviewTime: {
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
}));

export default ProfileReviewSection;
