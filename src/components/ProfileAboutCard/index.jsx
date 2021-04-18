import { Grid, makeStyles, Typography } from "@material-ui/core";
import { LocationCity, MailOutline, Phone, Place } from "@material-ui/icons";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import DashboardCard from "../DashboardCard";

function DetailRow({ section, icon, text, classes, editable }) {
  const globalClasses = globalStyles();
  return (
    <Grid container className={classes.infoRow}>
      <Grid className={classes.logo}>{icon}</Grid>
      <Typography className={`${globalClasses.bold}`}>
        {text || `Please add your ${section}`}
      </Typography>
    </Grid>
  );
}

function Details(props) {
  const globalClasses = globalStyles();
  const { classes, about, email, phoneNumber, location } = props;
  return (
    <>
      <Typography className={`${globalClasses.bold}`} gutterBottom>
        About
      </Typography>
      <Typography paragraph className={classes.infoRow}>
        {about ? about : "Please add some details about yourself"}
      </Typography>

      <DetailRow
        section={"email"}
        text={email}
        classes={classes}
        icon={<MailOutline />}
      />

      <DetailRow
        section={"phone number"}
        text={phoneNumber}
        classes={classes}
        icon={<Phone />}
      />
      <DetailRow
        section={"location"}
        text={location}
        classes={classes}
        icon={<Place />}
      />

      <Grid container className={classes.infoRow}>
        <Grid className={classes.logo}>
          <Place />
        </Grid>
        <Typography className={`${globalClasses.bold}`}>
          {location ? location : "Please update your location"}
        </Typography>
      </Grid>
    </>
  );
}

function ProfileAboutCard({ profileData }) {
  const classes = styles();

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid>
        <Grid container spacing={5} className={classes.desktop}>
          <Grid item sm={6}>
            <Details
              about={profileData.about}
              email={profileData.email}
              phoneNumber={profileData.phoneNumber}
              location={profileData.location}
              classes={classes}
            />
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
            <Details
              about={profileData.about}
              email={profileData.email}
              phoneNumber={profileData.phoneNumber}
              location={profileData.location}
              classes={classes}
            />
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
