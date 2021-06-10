import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { Context } from "../../src/components/AuthenticationContext";
import FallbackLoading from "../../src/components/FallbackLoading";
import VendorDashboard from "../../src/components/VendorDashboard";

export default function Vendor() {
  const user = React.useContext(Context);
  const router = useRouter();

  React.useState(() => {
    if (!user && router.isReady) {
      console.log("Why is this being called", user, router);
    }
  }, []);

  return (
    <Grid>
      {user ? <VendorDashboard></VendorDashboard> : <FallbackLoading />}
    </Grid>
  );
}
