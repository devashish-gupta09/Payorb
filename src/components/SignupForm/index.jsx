import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Maximize, AccountCircle, Lock, MoreHoriz } from "@material-ui/icons";
import Link from "next/link";

import ButtonCapsule from "../ButtonCapsule";

import { styles } from "./styles";

import app from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import { useRouter } from "next/router";
import { addUser } from "../../services/auth";
import { AUTH_PROVIDERS, USERNAME_TYPE } from "../../constants/auth";
import useFederatedAuth from "../../hooks/useFederatedAuth";
import { PAGE_PATHS } from "../../constants/paths";
import { useFormik } from "formik";
import React from "react";

import { signUpValidation, phoneRegExp } from "../../validations/signup";

export const handleUserAddition = async (userRes, idToken) => {
  try {
    if (userRes && idToken) {
      const addUserRes = await addUser({
        name: userRes.user.displayName
          ? userRes.user.displayName
          : userRes.user.name,
        email: userRes.user.email,
        phoneNumber: userRes.user.phoneNumber
          ? userRes.user.phoneNumber
          : undefined,
        location: userRes.location,
      });

      return addUserRes;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserNameFieldLabel = (type) => {
  if (type === USERNAME_TYPE.EMAIL) {
    return "Email";
  } else if (type === USERNAME_TYPE.PHONE_NUMBER) {
    return "Phone Number";
  } else {
    return "Email or Phone Number";
  }
};

function SignUpForm() {
  const classes = styles();
  const router = useRouter();
  const { fedSignUp } = useFederatedAuth();
  const [usernameType, setUsernameType] = React.useState();
  const [confirmationResult, setConfirmationResult] = React.useState();
  const [otpModal, setOtpModal] = React.useState({ display: false, text: "" });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
      location: "",
      otp: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidation,
    onSubmit: async (values) => {
      try {
        let user;

        // Create a account with firebase.
        if (usernameType === USERNAME_TYPE.PHONE_NUMBER) {
          if (!confirmationResult) {
            throw new Error(
              `Make sure you have received OTP on phone number before proceeding forward.`
            );
          }

          user = await confirmationResult.confirm(values.otp);
        } else if (usernameType === USERNAME_TYPE.EMAIL) {
          user = await app
            .auth()
            .createUserWithEmailAndPassword(values.username, values.password);
        }
        if (user) {
          await handleUserAddition(
            { ...user, location: values.location },
            await FirebaseAuth.Singleton().getIdToken()
          );

          router.push(
            `${PAGE_PATHS.VENDOR}/${PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}`
          );
        }
      } catch (err) {
        const firebaseInstance = FirebaseAuth.Singleton();
        await firebaseInstance.signOut();
        setOtpModal({ display: true, text: err.message });
      }
    },
  });

  const handleModalClose = () => {
    setOtpModal({ display: false, text: "" });
  };

  // In case of fedrated sign up we are going to
  // sign in a user using a social platform but
  // we would also need to persist the user's information
  // to the backend as well
  const handleFederatedSignUp = async (provider) => {
    try {
      const { userInfo, idToken } = await fedSignUp(provider);

      if (userInfo && idToken) {
        const res = await handleUserAddition(userInfo, idToken);
        if (res) {
          router.push(
            `${PAGE_PATHS.VENDOR}/${PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}`
          );
        } else {
          const firebaseInstance = FirebaseAuth.Singleton();
          await firebaseInstance.signOut();
          throw "Not able to save the user. Try refreshing page.";
        }
      } else {
        throw "Not able to sign in the user using a federated source.";
      }
    } catch (err) {
      setOtpModal({ display: true, text: err.message });
    }
  };

  const handleSendOTP = async () => {
    try {
      window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
        }
      );

      const phoneNumber = `+91${formik.values.username}`;
      const appVerifier = window.recaptchaVerifier;
      const response = await app
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);

      setOtpModal({ display: true, test: "OTP Sent" });
      setConfirmationResult(response);
    } catch (err) {
      setOtpModal({ display: true, text: err.message });
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

  return (
    <Grid className={classes.container}>
      <Dialog open={otpModal.display} onClose={handleModalClose}>
        <DialogContent>
          <Typography variant={"h6"}>{otpModal.text}</Typography>
        </DialogContent>
      </Dialog>
      <Typography className={classes.sectionTitle}>SIGN UP</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Get Started
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid className={classes.formContainer}>
          <Grid container alignItems="center" spacing={1}>
            {/* Username TextField */}
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
                fullWidth
                variant="outlined"
                type="password"
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
              <TextField
                className={classes.textInput}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                variant="outlined"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Lock style={{ color: "rgba(189, 189, 189, 1" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          {usernameType === USERNAME_TYPE.PHONE_NUMBER && (
            <TextField
              className={classes.textInput}
              id="otp"
              fullWidth
              label="OTP"
              variant="outlined"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
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

          <TextField
            className={classes.textInput}
            id="name"
            label="Your Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle style={{ color: "rgba(189, 189, 189, 1" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.textInput}
            id="location"
            label="Location"
            variant="outlined"
            fullWidth
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Lock style={{ color: "rgba(189, 189, 189, 1" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            disabled={
              !formik.values.name ||
              !formik.values.username ||
              (usernameType === USERNAME_TYPE.EMAIL &&
                (!formik.values.password || !formik.values.confirmPassword)) ||
              formik.errors.password ||
              formik.errors.confirmPassword ||
              (usernameType === USERNAME_TYPE.PHONE_NUMBER &&
                !formik.values.otp) ||
              formik.errors.name ||
              formik.errors.username
            }
            fullWidth
            className={classes.signupButton}
            type="submit"
          >
            Sign Up
          </Button>
          <Typography align="center" className={classes.orText}>
            OR
          </Typography>

          <Button
            fullWidth
            className={classes.socialMediaButtons}
            startIcon={
              <img
                src={"../assets/googleSignup.png"}
                style={{ padding: "0 0.5em" }}
              />
            }
            onClick={() => handleFederatedSignUp(AUTH_PROVIDERS.GOOGLE)}
          >
            Connect with google
          </Button>

          <Button
            fullWidth
            className={classes.socialMediaButtons}
            startIcon={
              <img
                src={"../assets/facebookSignup.png"}
                style={{ padding: "0 0.5em" }}
              />
            }
            onClick={() => handleFederatedSignUp(AUTH_PROVIDERS.FACEBOOK)}
          >
            Sign in with Facebook
          </Button>
          <Typography align="center" className={classes.signupMessage}>
            Already have an account?{" "}
            <Link href={PAGE_PATHS.SIGNIN}>Sign In</Link>
          </Typography>
        </Grid>
      </form>
    </Grid>
  );
}

export default SignUpForm;
