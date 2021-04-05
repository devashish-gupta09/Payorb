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
import { AlternateEmail, Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import { signInValidation } from "../../validations/signup";
import { AUTH_PROVIDERS } from "../../constants/auth";
import { handleUserAddition } from "../SignupForm";
import { useRouter } from "next/router";
import useFederatedAuth from "../../hooks/useFederatedAuth";
import { FirebaseAuth } from "../AuthenticationContext";

function SigninForm() {
  const classes = styles();
  const { fedSignUp } = useFederatedAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
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

  return (
    <Grid className={classes.container}>
      <Typography className={classes.sectionTitle}>SIGN IN</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Welcome back
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={classes.formContainer}>
          <TextField
            className={classes.textInput}
            id="email"
            label="Email Id"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
