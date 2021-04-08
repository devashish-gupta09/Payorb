import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { PAGE_PATHS } from "../../constants/paths";
import VendorDashboardHeader from "../DashboardHeader";
import FallbackPage from "../FallbackPage";
import Profile from "../Profile";
import VendorDashboardContainer from "../VendorDashboardContainer";
import VendorEvents from "../VendorEvents";
import { styles } from "./styles";

function VendorDashboard() {
  const router = useRouter();

  const getComponent = (route) => {
    switch (route) {
      case PAGE_PATHS.VENDOR_DASHBOARD_PROFILE:
        return <Profile />;
      case PAGE_PATHS.VENDOR_DASHBOARD_EVENTS:
        return <VendorEvents />;
      default:
        return (
          <FallbackPage
            title="Page Not Found"
            subtitle="Try refreshing your page or return to home"
          />
        );
    }
  };

  return (
    <Grid>
      <VendorDashboardHeader />
      <VendorDashboardContainer>
        {getComponent(router.query.section)}
      </VendorDashboardContainer>
    </Grid>
  );
}

export default VendorDashboard;
