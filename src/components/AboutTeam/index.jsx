import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function AboutTeam() {
  const classes = styles();
  return (
    <Grid container className={classes.root} justify="space-between">
      <Grid container alignItems="center" justify="center" item sm={12}>
        <Grid>
          <Typography
            className={classes.meetTitle}
            variant="h4"
            gutterBottom
            align="center"
          >
            Meet the team
          </Typography>
          <Typography
            gutterBottom
            align="justify"
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
        className={classes.teamContainer}
        container
        item
        sm={6}
        alignItems="center"
        justify="center"
      >
        {/* <Grid className={classes.teamImageContainer}>
          <img
            className={classes.teamImage}
            src={
              "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
            }
          />
        </Grid> */}
        <Grid container alignItems="center" justify="center">
          <Grid>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              className={classes.teamTitle}
            >
              Abhinav Vishwa
            </Typography>
            <Typography
              gutterBottom
              align="justify"
              className={classes.teamDescription}
            >
              {`Senior programmer with 10+ years of experience in distributed software development, heads the tech gamut of the company.`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item sm={6} alignItems="center" justify="center">
        {/* <Grid className={classes.teamImageContainer}>
          <img
            className={classes.teamImage}
            src={
              "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
            }
          />
        </Grid> */}
        <Grid container alignItems="center" justify="center">
          <Grid>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              className={classes.teamTitle}
            >
              Madhurima Roy
            </Typography>
            <Typography
              gutterBottom
              align="justify"
              className={classes.teamDescription}
            >
              {`Marketing professional with global exposure in Business operations & Marketing communication, works in integrating the business output perspective of our clients to the tech deliverables of the Team.`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "4em 8em",
    width: "95vw",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1em 2em 1em",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "4em 10em",
    },
  },
  detailContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  meetTitle: {
    fontWeight: "bold",
    paddingBottom: "0.75em",
  },
  meetDescription: {
    color: "#828282",
    padding: "0 3em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0em",
    },
  },
  teamDescription: {
    color: "#828282",
    marginTop: "1em",
    padding: "0 1em",
    height: "4em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  teamTitle: {
    fontWeight: "bold",
    height: "2em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  teamImage: {
    height: "100%",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRadius: "50%",
    },
  },
  teamImageContainer: {
    height: "12em",
    borderRadius: "50%",
    padding: "2em 0",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 6em",
    },
  },
  teamContainer: {
    padding: "4em",
  },
}));

export default AboutTeam;
