import { Box, Drawer, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";

import ProfileSectionSidebar from "../DashboardProfile";
import { styles } from "./styles";

function VendorDashboardSidebar({ profileData }) {
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
      case 3:
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/promotions")
        );
        return;
      case 4:
        router.push(
          buildVendorDashboardUrl(getVendorIdFromUrl(router), "/myschedule")
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
    <Box className={classes.container}>
      <Drawer
        anchor="left"
        open={appMenu}
        className={classes.drawer}
        onClose={toggleDrawer}
      >
        <Grid className={classes.drawerItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={classes.drawerClose} onClick={toggleDrawer}>
              <Close />
            </Typography>
          </Grid>
          <Box>
            <Box className={classes.tabs}>
              <Grid container>
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
                        (isActive("events") && classes.activeLink) ||
                        classes.btn
                      }
                      label={
                        <div>
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
                        <div>
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
                        (isActive("customers") && classes.activeLink) ||
                        classes.btn
                      }
                      label={
                        <div>
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
                        <div>
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
                        <div>
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
            </Box>
          </Box>
        </Grid>
      </Drawer>
      {/* For Mobile Screens */}
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.mobile}
      >
        {/* <Grid item>
          <Logo redirectToHome={true} dark={true} width={"5em"}></Logo>
        </Grid> */}
        {/* <Grid className={classes.menuButtonContainer}>
          <Menu style={{ color: "black" }} onClick={toggleDrawer} />
        </Grid> */}
      </Grid>

      {/* For Desktop and wide screens */}

      <Box className={classes.header}>
        <ProfileSectionSidebar
          name={profileData.name}
          image={profileData.profileImgUrl}
          occupation={profileData.occupation}
        />
      </Box>
      <Box className={classes.content}>
        <Box className={classes.tabs}>
          <Grid container>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
        </Box>
      </Box>
    </Box>
  );
}

export default VendorDashboardSidebar;
