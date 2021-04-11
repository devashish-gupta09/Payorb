import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Maximize,
  AccountCircle,
  AlternateEmail,
  Lock,
  MoreHoriz,
  Phone,
} from "@material-ui/icons";

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
      const addUserRes = await addUser(
        {
          name: userRes.user.displayName,
          email: userRes.user.email,
          phoneNumber: userRes.user.phoneNumber,
          provider: userRes.additionalUserInfo.providerId,
        },
        idToken
      );

      return addUserRes;
    }
  } catch (error) {
    console.log(error);
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

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
      location: "",
      otp: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      console.log("The values submitted", values);
    },
  });

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
      <Typography className={classes.sectionTitle}>SIGN UP</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Get Started
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

          <TextField
            className={classes.textInput}
            id="name"
            label="Your Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
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
                !formik.values.password) ||
              (usernameType === USERNAME_TYPE.PHONE_NUMBER &&
                !formik.values.otp) ||
              formik.errors.password ||
              formik.errors.name ||
              formik.errors.username
            }
            className={classes.signupButton}
            type="submit"
          >
            Sign Up
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

export default SignUpForm;
