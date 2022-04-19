import {
  FormControl,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  useTheme,
} from "@material-ui/core";
import { Maximize, MoreHoriz } from "@material-ui/icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getCustomerForReview } from "../../services/customers";
import { addReview } from "../../services/review";
import { sendOTP, verifyOTP } from "../../services/twilio";

import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { createReviewValidationSchema } from "../../validations/review";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";

import CustomTextField from "../CustomTextField";
import FallbackLoading from "../FallbackLoading";
import ImageEventUpload from "../ImageEventUpload";

function ReviewForm() {
  const theme = useTheme();
  const classes = styles();
  const [croppedImg, setCroppedImage] = React.useState();
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [otpCountDown, setOtpCountDown] = React.useState(0);
  const [disableOtpButton, setDisableOtpButton] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const router = useRouter();
  const [confirmationResult, setConfirmationResult] = React.useState();
  const [otpLoading, setOtpLoading] = React.useState();
  const auth = FirebaseAuth.Singleton();

  const handleCroppedImage = React.useCallback((data) => {
    setCroppedImage(data);
  }, []);

  React.useEffect(() => {
    if (confirmationResult) {
      setOtpCountDown(30);
    }
  }, [confirmationResult]);

  React.useEffect(() => {
    let timerInterval;
    if (otpCountDown > 0) {
      timerInterval = setInterval(() => {
        setOtpCountDown(otpCountDown - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [otpCountDown]);

  const formik = useFormik({
    initialValues: {
      customerId: "",
      phoneNumber: "",
      email: "",
      review: "",
      imageUrl: "",
      eventName: "",
      eventId: "",
      vendorId: "",
      otp: "",
    },
    validationSchema: createReviewValidationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      try {
        const tempObject = { ...values };
        let verificationResult;
        delete tempObject.phoneNumber;
        delete tempObject.email;
        delete tempObject.otp;

        try {
          verificationResult = await verifyOTP(
            formik.values.phoneNumber,
            formik.values.otp
          );
        } catch (err) {
          showAlert(err.message);
          return;
        }

        if (!confirmationResult) {
          throw new Error("Please click on Get Otp");
        }

        if (!formik.values.otp) {
          throw new Error(
            "Please enter the otp received on registered mobile number"
          );
        }

        if (
          verificationResult &&
          verificationResult.response &&
          verificationResult.response.status === "approved"
        ) {
          let imageUrl = "";
          if (croppedImg) {
            imageUrl = await handleImageUpload(
              tempObject.customerId,
              tempObject.eventId
            );
          }

          const response = await addReview({
            ...tempObject,
            imageUrl: imageUrl || "",
          });

          if (response.success) {
            showAlert("Review Submitted");
            await delay(400);
            showAlert("Redirecting you to home.");
            await delay(200);
            router.push(PAGE_PATHS.LANDING);
          } else {
            showAlert(response.error, ALERT_TYPES.ERROR);
          }
        }
      } catch (err) {
        console.log("Eror", err);
        showAlert(err.error || err.message, ALERT_TYPES.ERROR);
      }

      await auth.signOut();
      setSubmitLoading(false);
    },
  });

  const handleImageUpload = React.useCallback(
    async (customerId, eventId) => {
      const type = croppedImg.substring(
        croppedImg.indexOf(":") + 1,
        croppedImg.indexOf(";")
      );

      const ref = firebase.storage().ref();
      const childRef = ref.child(
        `/reviews/${eventId}-${customerId}.${type.split("/")[1]}`
      );

      try {
        await childRef.putString(croppedImg, "data_url", {
          cacheControl: "max-age=9999999999",
          customMetadata: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        return await childRef.getDownloadURL();
      } catch (err) {
        // Don't do anything if an image upload is unsuccessful
        console.log("Error", err);
        throw err;
      }
    },
    [croppedImg]
  );

  const handleSendOTP = async () => {
    setOtpLoading(true);
    if (!formik.values.phoneNumber) {
      showAlert("Phone number not present. Please refresh the page.");
    }
    try {
      const phoneNumber = `${formik.values.phoneNumber}`;
      const response = await sendOTP(phoneNumber, "sms");
      showAlert("OTP Sent");
      setConfirmationResult(response);
      setDisableOtpButton(false);
    } catch (err) {
      showAlert(`OTP could not be sent. ${err.message}`, ALERT_TYPES.ERROR);
    }
    setOtpLoading(false);
  };

  React.useEffect(() => {
    if (router.isReady) {
      const { eventId, customerId } = router.query;

      if (!eventId || !customerId) {
        showAlert(
          "Sorry we are unable to retrieve data for review.",
          ALERT_TYPES.ERROR
        );
        delay(400).then(() => {
          router.push(PAGE_PATHS.LANDING);
        });
        return;
      }

      getCustomerForReview(eventId, customerId)
        .then((res) => {
          if (res.success) {
            formik.setValues({
              ...formik.values,
              ...res.data,
            });
          } else {
            showAlert(res.error, ALERT_TYPES.ERROR);
            delay(1000).then(() => {
              router.push(PAGE_PATHS.LANDING);
            });
            return;
          }
        })
        .catch(async (err) => {
          console.log("Eror", err);
          showAlert(err.error || err.message, ALERT_TYPES.ERROR);
          await delay(1000);
          router.push(PAGE_PATHS.LANDING);
          return;
        });
    }
  }, [router]);

  if (!formik.values.customerId && !formik.values.eventId) {
    return (
      <>
        {Alert()} <FallbackLoading />
      </>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {Alert()}
      <Grid container spacing={3}>
        <Grid item sm={12} container spacing={3}>
          <Grid item sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CustomTextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={formik.values.phoneNumber}
                  disabled
                  style={{ marginBottom: theme.spacing(3) }}
                />
              </Grid>
              <Grid item xs={4}>
                <ButtonCapsule
                  showLoader={otpLoading}
                  text={
                    otpLoading
                      ? ""
                      : otpCountDown
                      ? `Retry (${otpCountDown}s)`
                      : "Get OTP"
                  }
                  buttonStyle={classes.getOtp}
                  onClick={handleSendOTP}
                  disabled={otpLoading || disableOtpButton || otpCountDown}
                ></ButtonCapsule>
                <div id="sign-in-button"></div>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              className={classes.textInput}
              id="otp"
              label="OTP"
              variant="outlined"
              autoComplete={"off"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
              style={{ marginBottom: theme.spacing(3) }}
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
            <CustomTextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              style={{ marginBottom: theme.spacing(3) }}
              disabled
            />

            <Grid item sm={12} container>
              <CustomTextField
                fullWidth
                id="eventName"
                label="Event Name"
                variant="outlined"
                value={formik.values.eventName}
                disabled
              />
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <FormControl variant="outlined">
                <ImageEventUpload
                  croppedImg={croppedImg}
                  handleCroppedImage={handleCroppedImage}
                  imageProps={{
                    src: DEFAULT_EVENT_IMAGE,
                    className: classes.eventImage,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} container>
          <CustomTextField
            fullWidth
            multiline
            id="review"
            label="Write Review"
            variant="outlined"
            rows={6}
            value={formik.values.review}
            onChange={formik.handleChange}
            error={formik.touched.review && Boolean(formik.errors.review)}
            helperText={formik.touched.review && formik.errors.review}
          />
        </Grid>

        <Grid item sm={12} container justify="center">
          <ButtonCapsule
            showLoader={submitLoading}
            buttonStyle={classes.btnRootStyle}
            disabled={submitLoading}
            type="submit"
            text="Save"
          ></ButtonCapsule>
        </Grid>
      </Grid>
    </form>
  );
}

const styles = makeStyles((theme) => ({
  btnRootStyle: {
    padding: "0.5em 5em",
    fontWeight: "600",
    fontSize: "0.9em",
  },
  eventImage: {
    width: "100%",
    "&:hover": {
      boxShadow: "0px 0px 7px 0px grey",
    },
  },
  getOtp: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default ReviewForm;
