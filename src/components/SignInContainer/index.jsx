import { Grid } from "@material-ui/core";
import React from "react";
import SignInForm from "../SignInForm";
import SigningBanner from "../SigningBanner";
import { styles } from "./styles";

function SignInContainer() {
  const classes = styles();
  return (
    <Grid container>
      <Grid item sm={6}>
        <Grid className={classes.formLeft}>
          <SignInForm />
        </Grid>
        <Grid className={classes.imageTop}>
          <SigningBanner />
        </Grid>
      </Grid>
      <Grid item sm={6}>
        <Grid className={classes.formBottom}>
          <SignInForm />
        </Grid>
        <Grid className={classes.imageRight}>
          <SigningBanner />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignInContainer;
