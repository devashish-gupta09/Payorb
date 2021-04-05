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

import { styles } from "./styles";

import app from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import { useRouter } from "next/router";
import { addUser } from "../../services/auth";
import { AUTH_PROVIDERS } from "../../constants/auth";
import useFederatedAuth from "../../hooks/useFederatedAuth";
import { PAGE_PATHS } from "../../constants/paths";
import { useFormik } from "formik";

import { signUpValidation } from "../../validations/signup";

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

function SignUpForm() {
  const classes = styles();
  const router = useRouter();
  const { fedSignUp } = useFederatedAuth();

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
          alert("Please try again.")
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
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      location: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      console.log("The values submitted", values);
    },
  });

  return (
    <Grid className={classes.container}>
      <Typography className={classes.sectionTitle}>SIGN UP</Typography>
      <Typography variant={"h4"} className={classes.title}>
        Get Started
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={classes.formContainer}>
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
          <TextField
            className={classes.textInput}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Phone style={{ color: "rgba(189, 189, 189, 1" }} />
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
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="OTP"
            variant="outlined"
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
          <Button className={classes.signupButton} type="submit">
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
