import { Box, Drawer, Grid, Tab, Tabs, Toolbar } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";

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
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/events")
        );
        return;
      case 1:
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/financials")
        );
        return;
      case 2:
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/customers")
        );
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
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router)));
  };

  const handleClick = (endPoint) => {
    toggleDrawer();
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router), endPoint));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CustomHeader>
        <Toolbar>
          <Grid container alignItems="center">
            {/* For Mobile Screens */}
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.mobile}
            >
              <Grid>
                <Grid className={classes.menuButtonContainer}>
                  <img
                    src="/assets/hamburger.svg"
                    alt="hamburger"
                    onClick={toggleDrawer}
                  />
                  <Logo redirectToHome={true} dark={true} width={"5em"}></Logo>
                </Grid>
              </Grid>
              <Grid item>
                <ProfileSectionHeader image={profileData.profileImgUrl} />
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
                    width: "100%",
                    flexGrow: 1,
                  }}
                >
                  <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    TabIndicatorProps={{
                      className: classes.activeTab,
                    }}
                  >
                    <Tab
                      className={isActive("events") && classes.activeLink}
                      label="Home"
                      value={0}
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
      <Drawer
        anchor="left"
        open={appMenu}
        onClose={toggleDrawer}
        sx={{
          width: "60vw",
          height: "calc(100vh - 72px)",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "60vw",
            boxSizing: "border-box",
            height: "calc(100vh - 72px) !important",
          },
        }}
      >
        <Toolbar />
        <Grid className={classes.drawerItemContainer}>
          <Grid className={classes.drawerList}>
            <Grid
              style={{
                width: "100%",
                flexGrow: 1,
              }}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                textColor="primary"
                orientation="vertical"
                TabIndicatorProps={{
                  className: classes.activeTab,
                }}
              >
                <Tab
                  className={
                    (isActive("events") && classes.activeLink) || classes.btn
                  }
                  label={
                    <div className={classes.navItem}>
                      <img
                        src="/assets/sidebar/event-icon.svg"
                        alt="events"
                        style={{
                          verticalAlign: "middle",
                          paddingRight: "1em",
                        }}
                      />
                      Events
                    </div>
                  }
                  value={0}
                />
                <Tab
                  className={
                    (isActive("financials") && classes.activeLink) ||
                    classes.btn
                  }
                  label={
                    <div className={classes.navItem}>
                      <img
                        src="/assets/sidebar/finance-icon.svg"
                        alt="financial"
                        style={{
                          verticalAlign: "middle",
                          paddingRight: "1em",
                        }}
                      />
                      Financials
                    </div>
                  }
                  values={1}
                />
                <Tab
                  className={
                    (isActive("customers") && classes.activeLink) || classes.btn
                  }
                  label={
                    <div className={classes.navItem}>
                      <img
                        src="/assets/sidebar/customers-icon.svg"
                        alt="customers"
                        style={{
                          verticalAlign: "middle",
                          paddingRight: "1em",
                        }}
                      />
                      Customers
                    </div>
                  }
                  values={2}
                />
                <Tab
                  className={
                    (isActive("promotions") && classes.activeLink) ||
                    classes.btn
                  }
                  iconPosition="start"
                  label={
                    <div className={classes.navItem}>
                      <img
                        src="/assets/sidebar/promotion-icon.svg"
                        alt="promotions"
                        style={{
                          verticalAlign: "middle",
                          paddingRight: "1em",
                        }}
                      />
                      Promotions
                    </div>
                  }
                  values={3}
                />
                <Tab
                  className={
                    (isActive("myschedule") && classes.activeLink) ||
                    classes.btn
                  }
                  label={
                    <div className={classes.navItem}>
                      <img
                        src="/assets/sidebar/schedule-icon.svg"
                        alt="my-schedule"
                        style={{
                          verticalAlign: "middle",
                          paddingRight: "1em",
                          alignItems: "left",
                        }}
                      />
                      My Schedule
                    </div>
                  }
                  values={4}
                />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
}

export default VendorDashboardHeader;
