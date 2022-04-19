import { Grid } from "@material-ui/core";
import React from "react";

import { AppFooter } from "../../../src/components/AppFooter";

import { Context } from "../../../src/components/AuthenticationContext";
import FallbackLoading from "../../../src/components/FallbackLoading";
import VendorDashboard from "../../../src/components/VendorDashboard";

export default function Vendor() {
  const user = React.useContext(Context);
  return (
    <Grid>
      {user ? <VendorDashboard></VendorDashboard> : <FallbackLoading />}
    </Grid>
  );
}
