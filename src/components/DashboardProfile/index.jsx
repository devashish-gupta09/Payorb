import {
  Avatar,
  Box,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";

function ProfileSectionSidebar({ image, name, occupation }) {
  const classes = styles();

  return (
    <Tooltip title="Go to profile">
      <Box className={classes.header}>
        <Box>
          {image ? (
            <Avatar className={classes.avatar} src={image} />
          ) : (
            <Avatar
              src={
                "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
              }
            />
          )}
        </Box>
        <Box className={classes.content}>
          <Typography className={classes.name} variant="h6" align="center">
            {name ? name : "Welcome User"}
          </Typography>
          <Typography variant="body1" align="center">
            {occupation ? occupation : "Occupation"}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}

export default ProfileSectionSidebar;

const styles = makeStyles((theme) => ({
  header: {
    height: "calc(10vh)",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    display: "block",
    margin: "0 auto",
    border: "1em solid white",
    width: "12em",
    height: "12em",
    borderRadius: "50%",
  },
  content: {
    margin: "1em",
  },
  name: {
    fontWeight: "500",
  },
}));
