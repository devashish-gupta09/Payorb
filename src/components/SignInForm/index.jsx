import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";

import { AccountCircle, Lock, Maximize, MoreHoriz } from "@material-ui/icons";
import { useFormik } from "formik";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { AUTH_PROVIDERS, USERNAME_TYPE } from "../../constants/auth";
import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFederatedAuth from "../../hooks/useFederatedAuth";
import { getUser } from "../../services/auth";
import app from "../../utils/firebase";
import { buildVendorDashboardUrl } from "../../utils/url";
import { phoneRegExp } from "../../validations/signup";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import { getUserNameFieldLabel } from "../SignupForm";
import { styles } from "./styles";

function SigninForm() {
  const classes = styles();
  const { fedSignUp } = useFederatedAuth();
  const router = useRouter();
  const [usernameType, setUsernameType] = React.useState();
  const [confirmationResult, setConfirmationResult] = React.useState();
  const auth = FirebaseAuth.Singleton();
  const { Alert, showAlert } = useAlertSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      otp: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        // Create a account with firebase.
        if (usernameType === USERNAME_TYPE.PHONE_NUMBER) {
          if (!confirmationResult) {
            throw new Error(
              `Make sure you have received OTP on phone Number before proceeding forward.`
            );
          }

          await confirmationResult.confirm(values.otp);
        } else if (usernameType === USERNAME_TYPE.EMAIL) {
          await app
            .auth()
            .signInWithEmailAndPassword(values.username, values.password);
        } else {
          return;
        }

        if (auth.getUser()) {
          router.push(buildVendorDashboardUrl(auth.getUser().uid, "/events"));
        }

        return;
      } catch (err) {
        const firebaseInstance = FirebaseAuth.Singleton();
        await firebaseInstance.signOut();
        showAlert(err.message, ALERT_TYPES.ERROR);
      }
    },
  });

  // In case of fedrated sign up we are going to
  // sign in a user using a social platform but
  // we would also need to persist the user's information
  // to the backend as well
  const handleFederatedSignIn = async (provider) => {
    try {
      const { userInfo, idToken } = await fedSignUp(provider);
      if (userInfo && idToken) {
        const result = await getUser({
          vendorId: userInfo.uid || userInfo.user.uid,
        });

        const { vendor } = result.data;

        router.replace(
          buildVendorDashboardUrl(vendor.username || vendor.userUID, "/events")
        );
      } else {
        throw "Not able to sign in the user using a federated source.";
      }
    } catch (err) {
      showAlert(err.message, ALERT_TYPES.ERROR);
    }
  };

  const handleUsernameChange = (event) => {
    formik.handleChange(event);

    if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(event.target.value)) {
      setUsernameType(USERNAME_TYPE.EMAIL);
    } else if (phoneRegExp.test(event.target.value)) {
      setUsernameType(USERNAME_TYPE.PHONE_NUMBER);
    } else {
      setUsernameType();
    }
  };

  const handleSendOTP = async () => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = `+91${formik.values.username}`;

    try {
      const response = await app
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      showAlert("OTP Sent");
      setConfirmationResult(response);
    } catch (err) {
      if (
        err &&
        err.message &&
        err.message.includes(
          "reCAPTCHA has already been rendered in this element"
        )
      ) {
        showAlert("OTP Sent");
      } else {
        showAlert(`OTP could not be sent. ${err.message}`, ALERT_TYPES.ERROR);
      }
    }
  };

  return (
    <Grid className={classes.container}>
      {Alert()}
      <Typography className={classes.sectionTitle}>SIGN IN</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Welcome back
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={classes.formContainer}>
          <Grid container alignItems="center" spacing={1}>
            <Grid
              item
              xs={usernameType === USERNAME_TYPE.PHONE_NUMBER ? 8 : 12}
            >
              <TextField
                className={classes.textInput}
                id="username"
                label={getUserNameFieldLabel(usernameType)}
                variant="outlined"
                onChange={handleUsernameChange}
                onBlur={formik.handleBlur}
                fullWidth
                autoComplete={"off"}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle
                        style={{ color: "rgba(189, 189, 189, 1" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {usernameType === USERNAME_TYPE.PHONE_NUMBER && (
              <Grid item xs={4} container justify="flex-end">
                <ButtonCapsule
                  text="Get OTP"
                  buttonStyle={classes.getOtp}
                  onClick={handleSendOTP}
                ></ButtonCapsule>
                <div id="sign-in-button"></div>
              </Grid>
            )}
          </Grid>
          {usernameType === USERNAME_TYPE.EMAIL && (
            <Grid>
              <TextField
                className={classes.textInput}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                autoComplete={"off"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
            </Grid>
          )}
          {usernameType === USERNAME_TYPE.PHONE_NUMBER && (
            <TextField
              className={classes.textInput}
              id="otp"
              label="OTP"
              variant="outlined"
              autoComplete={"off"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Grid style={{ display: "flex", flexDirection: "column" }}>
                      <MoreHoriz
                        style={{
                          color: "rgba(189, 189, 189, 1",
                        }}
                      />
                      <Maximize style={{ color: "rgba(189, 189, 189, 1" }} />
                    </Grid>
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Button
            className={classes.signinButton}
            type="submit"
            disabled={
              !formik.values.username ||
              (usernameType === USERNAME_TYPE.EMAIL &&
                !formik.values.password) ||
              (usernameType === USERNAME_TYPE.PHONE_NUMBER &&
                !formik.values.otp)
            }
          >
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
            onClick={() => handleFederatedSignIn(AUTH_PROVIDERS.GOOGLE)}
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
            onClick={() => handleFederatedSignIn(AUTH_PROVIDERS.FACEBOOK)}
          >
            Sign in with Facebook
          </Button>
          <Typography align="center" className={classes.signupMessage}>
            {`Don't have an account ? `}
            <Link href={PAGE_PATHS.SIGNUP}>Sign Up</Link>
          </Typography>
        </FormControl>
      </form>
    </Grid>
  );
}

export default SigninForm;
