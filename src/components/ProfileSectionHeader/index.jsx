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
        {image && <Avatar src={image} />}
        <Typography>{name ? name : "Welcome User"}</Typography>
      </Grid>
    </Tooltip>
  );
}

export default ProfileSectionHeader;
