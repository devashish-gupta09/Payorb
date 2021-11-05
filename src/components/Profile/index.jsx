import { Fade, Grid } from "@material-ui/core";
import React from "react";

import ProfileDetailsSection from "../ProfileDetailsSection";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePageCarausel from "../ProfilePageCarausel";
import ProfilePaymentSection from "../ProfilePaymentSection";

export default function Profile({ profileData }) {
  const [profileInfo, setProfileInfo] = React.useState(profileData);
  const updateProfileInfo = (data) => {
    setProfileInfo(data);
  };

  return (
    <Fade in={true} timeout={500}>
      <Grid>
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
        <ProfilePageCarausel
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
          vendor={true}
        />
        <ProfilePaymentSection
          profileData={profileInfo}
          updateProfile={updateProfileInfo}
        />
      </Grid>
    </Fade>
  );
}
