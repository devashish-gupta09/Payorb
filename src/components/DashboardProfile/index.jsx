import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import React from "react";

function ProfileSectionSidebar({ image, name, occupation }) {
  const classes = styles();

  return (
    <Box className={classes.header}>
      <Box>
        {image ? (
          <Avatar className={classes.avatar} src={image} />
        ) : (
          <Avatar
            className={classes.avatar}
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

        {occupation ? (
          <Typography variant="body1" align="center">
            <WorkOutlineIcon
              style={{ verticalAlign: "middle", marginRight: "0.5em" }}
            />
            {occupation}
          </Typography>
        ) : null}
      </Box>
    </Box>
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
    border: "0.5em solid white",
    width: "10em",
    height: "10em",
    borderRadius: "50%",
  },
  content: {
    margin: "1em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  name: {
    fontWeight: "500",
    marginBottom: "0.25em",
  },
}));
