import { Fade, Grid, List, ListItem } from "@material-ui/core";
import React from "react";

import ProfileDetailsSection from "../ProfileDetailsSection";
import { ProfileHeader } from "../ProfileHeader";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePageCarausel from "../ProfilePageCarausel";
import ProfilePaymentSection from "../ProfilePaymentSection";

const Box = ({ num }) => {
  const [state, setState] = React.useState(num);

  return <div>child state ${state}</div>;
};

const App = () => {
  const [state, setState] = React.useState();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => setState(Math.random(10))}>Click Me</button>
      <div>parent state: {state}</div>
      <Box num={state} />
    </div>
  );
};


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
              <List style={{ overflow: "hidden", color: "#929292", padding: "0" }}>
                <ListItem style={{ display: "inline-block", width: "fit-content", padding: "1em 1.5em", borderBottom: "3.5px solid #008EFF", fontWeight: "bold", color: "#008EFF" }}>Profile</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content", padding: "1em 1.5em", }}>Reviews</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content", padding: "1em 1.5em", }}>Payments</ListItem>
                <ListItem style={{ display: "inline-block", width: "fit-content", padding: "1em 1.5em", }}>Payments</ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid container alignItems="stretch">
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

        <ProfileImageGallery profileData={profileInfo} vendor={true} updateProfile={updateProfileInfo} />

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
