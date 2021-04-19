import { Avatar, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React from "react";

function ProfileSectionHeader({ image, name }) {
  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      style={{ color: "#333333" }}
    >
      {image && <Avatar src={image} />}
      <Typography>{name ? name : "Welcome User"}</Typography>
      <KeyboardArrowDown style={{ fontSize: "1em" }} />
    </Grid>
  );
}

export default ProfileSectionHeader;
