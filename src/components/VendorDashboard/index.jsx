import { Grid } from "@material-ui/core";
import React from "react";
import VendorDashboardHeader from "../DashboardHeader";
import Profile from "../Profile";
import VendorDashboardContainer from "../VendorDashboardContainer";
import { styles } from "./styles";

function VendorDashboard() {
  const classes = styles();

  return (
    <Grid>
      <VendorDashboardHeader />
      <VendorDashboardContainer>
        <Profile />
      </VendorDashboardContainer>
    </Grid>
  );
}

export default VendorDashboard;
