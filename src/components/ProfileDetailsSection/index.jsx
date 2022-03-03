import { Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";

import ProfileAboutCard from "../ProfileAboutCard";
import ProfileReviewSection from "../ProfileReviewSection";
import TabPanel from "../TabPanel";
import { styles } from "./styles";

function ProfileDetailsSection({ profileData, vendor, updateProfile }) {
  const classes = styles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
