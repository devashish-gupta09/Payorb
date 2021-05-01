import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import ButtonCapsule from "../ButtonCapsule";
import app from "../../utils/firebase";

function EventBookingForm({ eventLink, price }) {
  const [otpSent, setOtpSent] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    display: false,
    text: "",
  });
  const classes = styles();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      let user;

      if (!confirmationResult) {
        throw Error("Please send the OTP first");
      }

      // Potential Bug. :what if the user changes his phone number
      // after receiveing the OTP?
      user = await confirmationResult.confirm(values.otp);

      if (user) {
        console.log("User Registered.");
      }
    },
  });

  const sendOTP = async () => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );

    try {
      if (formik.values.phoneNumber) {
        const phoneNumber = `+91${formik.values.phoneNumber}`;
        const appVerifier = window.recaptchaVerifier;
        const response = await app
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);

        setSnackbar({ display: true, text: "OTP sent" });
        setConfirmationResult(response);
      } else {
        formik.setFieldError("phoneNumber", "Please enter phone number");
      }
    } catch (err) {
      setSnackbar({ display: true, text: "Error sending otp" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ display: false, text: "" });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container alignItems="center">
          
          <TextField
            id="name"
            className={classes.textInput}
            label={"Name"}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
          <TextField
            id="email"
            className={classes.textInput}
            label={"Email Id"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="phoneNumber"
            className={classes.textInput}
            label={"Name"}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={sendOTP}>Get OTP</Button>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            id="otp"
            className={classes.textInput}
            label={"OTP"}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            fullWidth
          />
          <ButtonCapsule
            buttonStyle={classes.paybutton}
            disabled={otpSent && confirmationResult}
            text={`Pay Rs.${price}`}
            type={"submit"}
          />
        </Grid>

        <Snackbar
          open={snackbar.display}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Typography>{snackbar.text}</Typography>
        </Snackbar>
      </form>
    </>
  );
}

const styles = makeStyles((theme) => ({
  textInput: {
    margin: "0.75em 0",
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.75em",
      width: "100%",
    },
  },
  paybutton: {
    width: "100%",
    margin: "1em 0",
  },
 
}));

export default EventBookingForm;
