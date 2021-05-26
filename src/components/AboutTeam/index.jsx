import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function AboutTeam() {
  const classes = styles();
  return (
    <Grid container className={classes.root} justify="space-between">
      <Grid container alignItems="center" justify="center" item sm={12}>
        <Grid>
          <Typography variant="h3" gutterBottom align="center">
            Meet the team
          </Typography>
          <Typography
            gutterBottom
            align="center"
            className={classes.meetDescription}
          >
            {`We are a team of highly motivated professionals, implementing and
            learning each day, nimble in the way we function, and keep our
            client's business output at the top priority. With expertise &
            insights from diverse industries we bring to you technology
            solutions in the form of economic & scalable offerings.`}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        sm={6}
        alignItems="center"
        justify="center"
        style={{ border: "2px solid" }}
      >
        <Grid>
          <img src={} />
        </Grid>
      </Grid>
      <Grid
        item
        sm={6}
        alignItems="center"
        justify="center"
        style={{ border: "2px solid" }}
      ></Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "4em 8em ",
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1em 2em 1em",
    },
  },
  detailContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  meetDescription: {
    color: "#828282",
  },
}));

export default AboutTeam;
