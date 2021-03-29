import { Grid } from "@material-ui/core";
import React from "react";
import { signUp } from "../../utils/auth";
import SigningBanner from "../SigningBanner";
import SignUpForm from "../SignupForm";
import { styles } from "./styles";

function SignUpContainer({ content }) {
  const classes = styles();

  return (
    <Grid container className={classes.container} alignItems="stretch">
      <Grid item sm={6} className={classes.leftContainer}>
        <Grid className={classes.formLeft}>
          <SignUpForm />
        </Grid>
        <Grid className={classes.imageTop}>
          <SigningBanner content={content} />
        </Grid>
      </Grid>
      <Grid item sm={6} container alignItems="stretch">
        <Grid className={classes.formBottom}>
          <SignUpForm />
        </Grid>
        <Grid className={classes.imageRight}>
          <SigningBanner content={content} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignUpContainer;
