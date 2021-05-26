import { Avatar, Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";

function ProfileSectionHeader({ image, name }) {
  return (
    <Tooltip title="Go to profile">
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        style={{ color: "#333333" }}
      >
        <Grid style={{ padding: "0 1em" }}>
          {image ? (
            <Avatar src={image} />
          ) : (
            <Avatar
              src={
                "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
              }
            />
          )}
        </Grid>
        <Typography>{name ? name : "Welcome User"}</Typography>
      </Grid>
    </Tooltip>
  );
}

export default ProfileSectionHeader;
