import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useRouter } from "next/router";
import React from "react";

import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";
import Logout from "../LogoutButton";

function ProfileSectionHeader({ image, name }) {
  const classes = styles();
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();

  const toggleTooltip = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router)));
  };

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      style={{ color: "#333333" }}
    >
      <Grid style={{ padding: "0 1em", display: "contents" }}>
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
      </Grid>
      <Typography>
        <Box className={classes.name}>{name ? name : "Welcome User"}</Box>
        <IconButton className={classes.arrow} onClick={toggleTooltip}>
          <ExpandMoreIcon />
        </IconButton>
      </Typography>
      {expanded ? (
        <Grid className={classes.expand}>
          <Button className={classes.btn} onClick={handleProfileClick}>
            <AssignmentIndIcon /> My Profile
          </Button>
          <Logout />
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}

export default ProfileSectionHeader;

const styles = makeStyles((theme) => ({
  name: {
    verticalAlign: "middle",
    display: "contents",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  avatar: {
    marginRight: "4px",
  },
  arrow: {
    position: "absolute",
    marginTop: "-12px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-24px",
      right: "-24px",
    },
  },
  expand: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    top: "60px",
    right: "0",
    padding: "1em",
    background: "#fff",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
  },
  btn: {
    color: "#7B7B7B",
  },
}));
