import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { PAGE_PATHS } from "../../constants/paths";

import { FirebaseAuth } from "../AuthenticationContext";

import SignInForm from "../SignInForm";
import SigningBanner from "../SigningBanner";
import { styles } from "./styles";

function SignInContainer({ content }) {
  const classes = styles();
  const router = useRouter();

  const auth = FirebaseAuth.Singleton();

  if (auth.getUser()) {
    router.push(`${PAGE_PATHS.VENDOR_DASHBOARD_EVENTS}`);
    return null;
  }

  return (
    <Grid container className={classes.container} alignItems="stretch">
      <Grid item sm={6} className={classes.leftContainer}>
        <Grid className={classes.formLeft}>
          <SignInForm />
        </Grid>
        <Grid className={classes.imageTop}>
          <SigningBanner content={content} />
        </Grid>
      </Grid>
      <Grid item sm={6} container alignItems="stretch">
        <Grid className={classes.formBottom}>
          <SignInForm />
        </Grid>
        <Grid className={classes.imageRight}>
          <SigningBanner content={content} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignInContainer;
