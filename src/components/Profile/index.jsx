import { Fade, Grid, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import ProfileDetailsSection from "../ProfileDetailsSection";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileImageGallery } from "../ProfileImageGallery";
import ProfileInfoCard from "../ProfileInfoCard";
import { ProfileNavBar } from "../ProfileNavBar";
import ProfileReviewSection from "../ProfileReviewSection";

export default function Profile({ profileData }) {
  const [profileInfo, setProfileInfo] = React.useState(profileData);
  const updateProfileInfo = (data) => {
    setProfileInfo({ ...data });
  };
  const classes = styles();
  return (
    <Fade in={true} timeout={500}>
      <Grid>
        <ProfileHeader
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
          vendor={true}
        />
        <Grid style={{ position: "relative" }}>
          <Grid className={classes.navbarDesktop}>
            <ProfileNavBar />
          </Grid>
          <Grid container alignItems="stretch">
            <ProfileInfoCard
              profileData={profileInfo}
              updateProfile={updateProfileInfo}
              vendor={true}
            />
            <Grid className={classes.navbarMobile}>
              <ProfileNavBar />
            </Grid>
            <ProfileDetailsSection
              profileData={profileInfo}
              updateProfile={updateProfileInfo}
              vendor={true}
            />
          </Grid>
        </Grid>

        <ProfileImageGallery
          profileData={profileInfo}
          vendor={true}
          updateProfile={updateProfileInfo}
        />

        <ProfileReviewSection />

        {/* <ProfilePaymentSection
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
        /> */}
      </Grid>
    </Fade>
  );
}

const styles = makeStyles((theme) => ({
  navbarMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      boxShadow: "0 6px 8px -8px rgb(0 0 0 / 25%)",
    },
  },
  navbarDesktop: {
    position: "absolute",
    width: "100%",
    height: "fit-content",
    paddingLeft: "45%",
    boxShadow: "0 6px 8px -8px rgb(0 0 0 / 25%)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
