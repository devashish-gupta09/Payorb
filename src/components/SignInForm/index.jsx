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

function SigninForm() {
  const classes = styles();

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
      </form>
    </Grid>
  );
}

export default SigninForm;
