import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import {
  Context,
  FirebaseAuth,
} from "../../src/components/AuthenticationContext";

export default function Vendor() {
  const user = React.useContext(Context);
  const router = useRouter();

  const auth = FirebaseAuth.Singleton();

  React.useState(() => {
    if (router.isReady) {
      console.log("Teer", auth.getUser());
      if (auth.getUser()) {
        console.log("We are here.", user);
        router.replace(`/vendor/${user.uid}`);
      }
    }
  }, [router, auth, user]);

  return (
    <Grid>
      <h1>Hey</h1>
      {/* {user ? <VendorDashboard></VendorDashboard> : <FallbackLoading />} */}
    </Grid>
  );
}
