import {
  Backdrop,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import ButtonCapsule from "../ButtonCapsule";
import { styles } from "./styles";
import app from "../../utils/firebase";
import React from "react";
import { AccountCircle, AlternateEmail, Lock } from "@material-ui/icons";

// import "firebase/auth";
// import { FirebaseAuth } from "../AuthenticationContext";

function SigninForm() {
  const classes = styles();

  const handleSignIn = async () => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    const appVerifier = window.recaptchaVerifier;

    const firebaseResponse = await app
      .auth()
      .signInWithPhoneNumber("+918968969078", appVerifier);

    const SignUp = await app.auth();

    console.log("Firebase Response : ", firebaseResponse);
  };

  return (
    <Grid className={classes.container}>
      <div id="recaptcha-container"></div>
      <Typography className={classes.sectionTitle}>SIGN IN</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Welcome back
      </Typography>
      <FormControl className={classes.formContainer}>
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="email"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmail style={{ color: "rgba(189, 189, 189, 1" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.textInput}
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Lock style={{ color: "rgba(189, 189, 189, 1" }} />
              </InputAdornment>
            ),
          }}
        />
        <Typography align="right" className={classes.forgotPassword}>
          Forgot Password ?
        </Typography>
        <Button className={classes.signinButton} onClick={handleSignIn}>
          Sign In
        </Button>
        <Typography align="center" className={classes.orText}>
          OR
        </Typography>

        <Button
          className={classes.socialMediaButtons}
          startIcon={
            <img
              src={"../assets/googleSignup.png"}
              style={{ padding: "0 0.5em" }}
            />
          }
        >
          Connect with google
        </Button>

        <Button
          className={classes.socialMediaButtons}
          startIcon={
            <img
              src={"../assets/facebookSignup.png"}
              style={{ padding: "0 0.5em" }}
            />
          }
        >
          Sign in with Facebook
        </Button>
        <Typography align="center" className={classes.signupMessage}>
          Dont’s have an account? Sign Up
        </Typography>
      </FormControl>
    </Grid>
  );
}

export default SigninForm;
