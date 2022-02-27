import { Fade, Grid, List, ListItem } from "@material-ui/core";
import React from "react";

import ProfileDetailsSection from "../ProfileDetailsSection";
import { ProfileHeader } from "../ProfileHeader";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePageCarausel from "../ProfilePageCarausel";
import ProfilePaymentSection from "../ProfilePaymentSection";

export default function Profile({ profileData }) {
  const [profileInfo, setProfileInfo] = React.useState(profileData);
  const updateProfileInfo = (data) => {
    setProfileInfo({ ...data });
  };

  return (
    <Fade in={true} timeout={500}>
      <Grid>
        <ProfileHeader
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
          vendor={true}
        />

        <Grid style={{ position: "relative" }}>
          <Grid style={{ position: "absolute", width: "100%", height: "fit-content", paddingLeft: "50%", boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)" }}>
            <Grid>
              <List style={{ overflow: "hidden", color: "#929292" }}>
                <ListItem style={{ display: "inline-block", width: "fit-content" }}>Profile</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content" }}>Reviews</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content" }}>Payments</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content" }}>Payments</ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid container>
            <ProfileInfoCard
              profileData={profileInfo}
              updateProfile={updateProfileInfo}
              vendor={true}
            />
            <ProfileDetailsSection
              profileData={profileInfo}
              updateProfile={updateProfileInfo}
              vendor={true}
            />
          </Grid>
        </Grid>

        {/* <ProfilePageCarausel
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
          vendor={true}
        /> */}
        <ProfilePaymentSection
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
        />
      </Grid>
    </Fade>
  );
}
