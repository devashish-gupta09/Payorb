import { Grid } from "@material-ui/core";
import React from "react";
import VendorDashboardHeader from "../DashboardHeader";
import Profile from "../Profile";
import { styles } from "./styles";

function VendorDashboard() {
  const classes = styles();
  return (
    <Grid>
      <VendorDashboardHeader />
      <Grid className={classes.container}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default VendorDashboard;
