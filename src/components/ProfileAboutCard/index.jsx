import { Grid, makeStyles, Typography } from "@material-ui/core";
import { LocationCity, MailOutline, Phone, Place } from "@material-ui/icons";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import DashboardCard from "../DashboardCard";

function Details(props) {
  const globalClasses = globalStyles();
  const { classes } = props;
  return (
    <>
      <Typography className={`${globalClasses.bold}`} gutterBottom>
        About
      </Typography>
      <Typography paragraph className={classes.infoRow}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisl
        turpis vitae mi convallis tristique sed. Malesuada sed in ac diam arcu
        vel at. Id neque, ipsum sed pharetra. Nunc vulputate lectus egestas elit
        odio odio posuere tellus sed. Nunc vulputate lectus egestas elit odio
        odio posuere tellus sed.
      </Typography>
      <Grid container className={classes.infoRow}>
        <Grid className={classes.logo}>
          <MailOutline />
        </Grid>
        <Typography className={`${globalClasses.bold}`}>
          alfredoculhane@g.co
        </Typography>
      </Grid>
      <Grid container className={classes.infoRow}>
        <Grid className={classes.logo}>
          <Phone />
        </Grid>
        <Typography className={`${globalClasses.bold}`}>
          +91 1242 1234 12
        </Typography>
      </Grid>
      <Grid container className={classes.infoRow}>
        <Grid className={classes.logo}>
          <Place />
        </Grid>
        <Typography className={`${globalClasses.bold}`}>Ahmedabad</Typography>
      </Grid>
    </>
  );
}

function ProfileAboutCard() {
  const classes = styles();

  return (
    <DashboardCard rootClass={classes.root} >
      <Grid>
        <Grid container spacing={5} className={classes.desktop}>
          <Grid item sm={6}>
            <Details classes={classes} />
          </Grid>
          <Grid item sm={6}>
            {/* Need to include a video section over here. */}
            <img style={{ width: "100%" }} src={"../assets/video.png"} />
          </Grid>
        </Grid>
        <Grid className={classes.mobile}>
          <Grid>
            {/* Need to include a video section over here. */}
            <img style={{ width: "100%" }} src={"../assets/video.png"} />
          </Grid>
          <Grid className={classes.mobileDetailsContainer}>
            <Details classes={classes} />
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({

  root: {
    borderRadius: "0.8em",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  logo: {
    paddingRight: "0.75em",
    color: "rgba(121, 223, 223, 1)",
  },
  infoRow: {
    paddingBottom: "0.5em",
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },
  },
  mobileDetailsContainer: {
    padding: "1em",
  },
}));

export default ProfileAboutCard;
