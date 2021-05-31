import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { Context } from "../../src/components/AuthenticationContext";
import React from "react";
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
      {user ? (
        <VendorDashboard></VendorDashboard>
      ) : (
        <Backdrop open>
          <Grid>
            <Typography variant="h3" style={{ color: "white" }}>
              {"Loading"}
            </Typography>
            <CircularProgress size="3rem" variant="indeterminate" />
          </Grid>
        </Backdrop>
      )}
    </Grid>
  );
}
