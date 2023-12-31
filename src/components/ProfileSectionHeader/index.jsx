import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useRouter } from "next/router";
import React from "react";

import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";
import Logout from "../LogoutButton";

function ProfileSectionHeader({ image, name }) {
  const classes = styles();
  const [expanded, setExpanded] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isActive = (value) => {
    if (window.location.pathname.includes(value)) {
      return true;
    }
  };

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    switch (value) {
      case 0:
        router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router), ""));
        return;
      case 1:
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/events")
        );
        return;
      default:
        break;
    }
  };

  const toggleTooltip = () => {
    setExpanded(!expanded);
  };

  const handleProfileClick = () => {
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router)));
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{
        color: "#333333",
        width: isMobile ? "fit-content" : "15em",
        // display: isMobile ? "none" : "flex",
      }}
    >
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
      {isMobile ? null : (
        <Typography>{name ? name : "Welcome User"}</Typography>
      )}
      <div onClick={toggleTooltip} style={{ padding: "0 0.25em" }}>
        <ExpandMoreIcon />
      </div>
      {expanded ? (
        <Grid className={classes.expand}>
          {router.pathname == `/vendor/[vendorId]` ? (
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="primary"
            >
              <Tab
                className={classes.tab}
                disableFocusRipple
                label={
                  <>
                    <Button className={classes.btn} value={0}>
                      <DashboardIcon className={classes.icon} /> My Dashboard
                    </Button>
                  </>
                }
                value={1}
              />
            </Tabs>
          ) : (
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="primary"
              // TabIndicatorProps={{
              //   className: classes.activeTab,
              // }}
            >
              <Tab
                className={classes.tab}
                // className={isActive("events") && classes.activeLink}
                disableFocusRipple
                label={
                  <>
                    <Button className={classes.btn} value={0}>
                      <AssignmentIndIcon className={classes.icon} />
                      My Profile
                    </Button>
                  </>
                }
                value={0}
              />
            </Tabs>
          )}
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  avatar: {
    marginRight: "5%",
    [theme.breakpoints.down("sm")]: {
      marginRight: "4px",
    },
  },
  arrow: {
    width: "fit-content",
    height: "fit-content",
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
    // padding: "1em",
    background: "#fff",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
  },
  expandTabs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  tab: {
    padding: "0",
  },
  btn: {
    color: "#7B7B7B",
    height: "48px",
    width: "100%",
    justifyContent: "flex-start",
    "&:hover": {
      background: "rgba(0, 142, 255, 0.06)",
      color: "#008EFF",
    },
  },
  icon: {
    marginRight: "4px",
  },
}));
