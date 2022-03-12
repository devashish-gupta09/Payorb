import { Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";

import ProfileAboutCard from "../ProfileAboutCard";
import ProfileReviewSection from "../ProfileReviewSection";
import TabPanel from "../TabPanel";
import { styles } from "./styles";

function ProfileDetailsSection({ profileData, vendor = true, updateProfile }) {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <ProfileAboutCard
        profileData={profileData}
        vendor={vendor}
        updateProfile={updateProfile}
      />
    </Grid>
  );
}

export default ProfileDetailsSection;
