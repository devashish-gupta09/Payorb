import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { styles } from "./styles";
import React from "react";
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

function SigninForm() {
  const classes = styles();
  const { fedSignUp } = useFederatedAuth();
  const router = useRouter();
  const [usernameType, setUsernameType] = React.useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      otp: "",
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: () => {
      console.log("Received Some values to sign in the user.");
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
        const res = await handleUserAddition(userInfo, idToken);
        if (res) {
          router.push(PAGE_PATHS.VENDOR_DASHBOARD);
        } else {
          console.log(
            "Not able to persist the user, therefore sign out the user to sign in again."
          );
          alert("Please try again.");
          const firebaseInstance = FirebaseAuth.Singleton();
          await firebaseInstance.signOut();
        }
      } else {
        throw "Not able to sign in the user using a federated source.";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (event) => {
    formik.handleChange(event);

    if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(event.target.value)) {
      console.log("Test");
      setUsernameType(USERNAME_TYPE.EMAIL);
    } else if (phoneRegExp.test(event.target.value)) {
      setUsernameType(USERNAME_TYPE.PHONE_NUMBER);
    } else {
      setUsernameType();
    }
  };

  return (
    <Grid className={classes.container}>
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
                ></ButtonCapsule>
              </Grid>
            )}
          </Grid>
          {usernameType === USERNAME_TYPE.EMAIL && (
            <TextField
              className={classes.textInput}
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock style={{ color: "rgba(189, 189, 189, 1" }} />
                  </InputAdornment>
                ),
              }}
            />
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
          <Typography align="right" className={classes.forgotPassword}>
            Forgot Password ?
          </Typography>
          <Button
            className={classes.signinButton}
            type="submit"
            disabled={
              !formik.values.password ||
              !formik.values.email ||
              formik.errors.password ||
              formik.errors.email
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
            Dont’s have an account? Sign Up
          </Typography>
        </FormControl>
      </form>
    </Grid>
  );
}

export default SigninForm;
