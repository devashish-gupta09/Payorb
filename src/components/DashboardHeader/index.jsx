import {
  Drawer,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import CustomHeader from "../Header";
import Logo from "../Logo";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { styles } from "./styles";

function VendorDashboardHeader({ profileData }) {
  const classes = styles();
  const [appMenu, setAppMenu] = React.useState(false);
  const router = useRouter();
  const [currentTab, setCurrentTab] = React.useState(false);

  const isActive = (value) => {
    if (window.location.pathname.includes(value)) {
      return true;
    }
  };

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    switch (value) {
      case 0:
        console.log("Tab Change", router);
        router.push(`/vendor/${router.query.vendorId}/events`);
        return;
      case 1:
        router.push(`/vendor/${router.query.vendorId}/financials`);
        return;
      case 2:
        router.push(`/vendor/${router.query.vendorId}/customers`);
        return;
      default:
        break;
    }
  };

  const toggleDrawer = () => {
    setAppMenu(!appMenu);
  };

  const handleProfileClick = () => {
    setCurrentTab(false);
    router.push(`/vendor/${router.query.vendorId}`);
  };

  const handleClick = (endPoint) => {
    toggleDrawer();
    router.push(`/vendor/${router.query.vendorId}/${endPoint}`);
  };

  return (
    <CustomHeader>
      <Drawer anchor="left" open={appMenu} onClose={toggleDrawer}>
        <Grid className={classes.drawerItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Logo redirectToHome={true} dark={true} width={"5em"} />
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>

          <Grid className={classes.drawerList}>
            <li
              className={isActive("event") && classes.activeLink}
              onClick={() => handleClick("events")}
            >
              Events
            </li>

            <li
              className={isActive("financials") && classes.activeLink}
              onClick={() => handleClick("financials")}
            >
              Financials
            </li>

            <li
              onClick={() => handleClick("customers")}
              className={isActive("customers") && classes.activeLink}
            >
              Customers
            </li>

            <li
              className={isActive("profile") && classes.activeLink}
              onClick={() => handleClick("")}
            >
              Profile
            </li>
          </Grid>
        </Grid>
      </Drawer>
      <Toolbar>
        <Grid container alignItems="center">
          {/* For Mobile Screens */}
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.mobile}
          >
            <Grid item>
              <Logo redirectToHome={true} dark={true} width={"5em"}></Logo>
            </Grid>
            <Grid className={classes.menuButtonContainer}>
              <Menu style={{ color: "black" }} onClick={toggleDrawer} />
            </Grid>
          </Grid>

          {/* For Desktop and wide screens */}

          <Grid container alignItems="center" className={classes.wideScreen}>
            <Grid item sm={2}>
              <Logo redirectToHome={true} dark={true} width={"4.5em"}></Logo>
            </Grid>
            <Grid container item sm={8}>
              <Grid
                style={{
                  // height: "30px",
                  width: "100%",
                  flexGrow: 1,
                }}
              >
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  textColor="primary"
                  centered
                  TabIndicatorProps={{
                    className: classes.activeTab,
                  }}
                >
                  <Tab
                    className={isActive("events") && classes.activeLink}
                    label="Events"
                    value={0}
                  />
                  <Tab
                    className={isActive("financials") && classes.activeLink}
                    label="Financials"
                    values={1}
                  />
                  <Tab
                    className={isActive("customers") && classes.activeLink}
                    label="Customers"
                    values={2}
                  />
                </Tabs>
              </Grid>
            </Grid>
            <Grid item sm={2}>
              <Grid
                style={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
                onClick={handleProfileClick}
              >
                <ProfileSectionHeader
                  image={profileData.profileImgUrl}
                  name={profileData.name}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </CustomHeader>
  );
}

export default VendorDashboardHeader;
