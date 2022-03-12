import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";

import { styles } from "./styles";

function VendorDashboardSidebar() {
  const classes = styles();

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

  const handleProfileClick = () => {
    setCurrentTab(false);
    router.push(buildVendorDashboardUrl(getVendorIdFromUrl(router)));
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
            alt="logo"
            className={classes.avatar}
          />
        </Box>
        <Box>
          <Typography className={classes.name} variant="h6" align="center">
            Aditya Tandon
          </Typography>
          <Typography variant="body1" align="center">
            Senior UX Designer
          </Typography>
        </Box>
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
                  label="Events"
                  value={0}
                />
                <Tab
                  className={
                    (isActive("financials") && classes.activeLink) ||
                    classes.btn
                  }
                  label="Financials"
                  values={1}
                />
                <Tab
                  className={
                    (isActive("customers") && classes.activeLink) || classes.btn
                  }
                  label="Customers"
                  values={2}
                />
                <Tab
                  className={
                    (isActive("promotions") && classes.activeLink) ||
                    classes.btn
                  }
                  label="Promotions"
                  values={3}
                />
                <Tab
                  className={
                    (isActive("myschedule") && classes.activeLink) ||
                    classes.btn
                  }
                  label="My Schedule"
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
