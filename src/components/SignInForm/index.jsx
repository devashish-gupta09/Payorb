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
import { styles } from "./styles";
import React, { useRef } from "react";
import {
  AccountCircle,
  AlternateEmail,
  Lock,
  Maximize,
  MoreHoriz,
} from "@material-ui/icons";
import { useFormik } from "formik";
import { phoneRegExp, signInValidation } from "../../validations/signup";
import { AUTH_PROVIDERS, USERNAME_TYPE } from "../../constants/auth";
import { getUserNameFieldLabel, handleUserAddition } from "../SignupForm";
import { useRouter } from "next/router";
import useFederatedAuth from "../../hooks/useFederatedAuth";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import Link from "next/link";
import app from "../../utils/firebase";
import { PAGE_PATHS } from "../../constants/paths";

function SigninForm() {
  const classes = styles();
  const { fedSignUp } = useFederatedAuth();
  const router = useRouter();
  const [usernameType, setUsernameType] = React.useState();
  const [confirmationResult, setConfirmationResult] = React.useState();
  const [otpModal, setOtpModal] = React.useState({ display: false, text: "" });

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

        router.push(
          `${PAGE_PATHS.VENDOR}/${PAGE_PATHS.VENDOR_DASHBOARD_EVENTS}`
        );
      } catch (err) {
        const firebaseInstance = FirebaseAuth.Singleton();
        await firebaseInstance.signOut();
        setOtpModal({ display: true, text: err.message });
      }
    },
  });

  // In case of fedrated sign up we are going to
  // sign in a user using a social platform but
  // we would also need to persist the user's information
  // to the backend as well
  const handleFederatedSignUp = async (provider) => {
    try {
      const { userInfo, idToken } = await fedSignUp(provider);

      if (userInfo && idToken) {
        router.push(
          `${PAGE_PATHS.VENDOR}/${PAGE_PATHS.VENDOR_DASHBOARD_EVENTS}`
        );
      } else {
        throw "Not able to sign in the user using a federated source.";
      }
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

  const handleSendOTP = async () => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );

    const phoneNumber = `+91${formik.values.username}`;
    const appVerifier = window.recaptchaVerifier;

    try {
      const response = await app
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      setOtpModal({ display: true, text: "OTP sent" });
      setConfirmationResult(response);
    } catch (err) {
      setOtpModal({ display: true, text: "OTP sent" });
    }
  };

  const handleModalClose = () => {
    setOtpModal({ display: false, text: "" });
  };

  return (
    <Grid className={classes.container}>
      <Dialog open={otpModal.display} onClose={handleModalClose}>
        <DialogContent className={classes.otpModal}>
          <Typography>{otpModal.text}</Typography>
        </DialogContent>
      </Dialog>
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
            onClick={() => handleFederatedSignUp(AUTH_PROVIDERS.GOOGLE)}
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
            onClick={() => handleFederatedSignUp(AUTH_PROVIDERS.FACEBOOK)}
          >
            Sign in with Facebook
          </Button>
          <Typography align="center" className={classes.signupMessage}>
            Don't have an account? <Link href={PAGE_PATHS.SIGNUP}>Sign Up</Link>
          </Typography>
        </FormControl>
      </form>
    </Grid>
  );
}

export default SigninForm;
