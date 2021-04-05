import { Avatar, Grid, Typography } from "@material-ui/core";
import { ArrowDownward, KeyboardArrowDown } from "@material-ui/icons";
import React from "react";

function ProfileSectionHeader({ image, name }) {
  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      style={{ color: "#333333" }}
    >
      <Avatar src={image}></Avatar>
      <Typography>{name}</Typography>
      <KeyboardArrowDown style={{ fontSize: "1em" }} />
    </Grid>
  );
}

export default ProfileSectionHeader;
