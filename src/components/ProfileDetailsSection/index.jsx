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
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
        }}
        TabIndicatorProps={{ children: <span /> }}
      >
        <Tab classes={{ root: classes.tabRoot }} label="Profile"></Tab>
        <Tab classes={{ root: classes.tabRoot }} label="Review"></Tab>
      </Tabs>
      <TabPanel value={value} index={0} boxClasses={classes.box}>
        <ProfileAboutCard
          profileData={profileData}
          vendor={vendor}
          updateProfile={updateProfile}
        />
      </TabPanel>

      <TabPanel value={value} index={1} boxClasses={classes.box}>
        <ProfileReviewSection />
      </TabPanel>
    </Grid>
  );
}

export default ProfileDetailsSection;
