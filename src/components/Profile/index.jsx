import { Fade, Grid } from "@material-ui/core";
import React from "react";

import ProfileDetailsSection from "../ProfileDetailsSection";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePaymentSection from "../ProfilePaymentSection";

export default function Profile({ profileData }) {
  return (
    <Fade in={true} timeout={500}>
      <Grid>
        <ProfileInfoCard profileData={profileData} vendor={true} />
        <ProfileDetailsSection profileData={profileData} vendor={true} />
        <ProfilePaymentSection profileData={profileData} />
      </Grid>
    </Fade>
  );
}
