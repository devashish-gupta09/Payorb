import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";
import { EVENT_TYPES } from "../../constants/events";
import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";

import { createCustomer } from "../../services/customers";
import {
  createOrder,
  failOrder,
  submitSuccessOrder,
} from "../../services/orders";
import { sendOTP, verifyOTP } from "../../services/twilio";
import { delay } from "../../utils/dateTime";
import { getRzpAmountFormat } from "../../utils/payments";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import PaymentSuccess from "../PaymentSuccess";

const loadRazorPay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
  });
};

function EventBookingForm({
  trialClass,
  eventLink,
  earlyBird,
  earlyBirdPrice,
  earlyBirdDeadline,
  price,
  type,
  oneOnOneBooking: { startDate },
}) {
  const [otpSent, setOtpSent] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState();
  const [otpCountDown, setOtpCountDown] = React.useState(0);
  const [disableOtpButton, setDisableOtpButton] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [success, setSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [paymentProgLoader, setPaymentProgLoader] = React.useState(false);
  const [tAndC, setTAndC] = React.useState(false);
  const auth = FirebaseAuth.Singleton();

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

  const handleTAndCChange = () => {
    setTAndC(!tAndC);
  };

  const classes = styles();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      otp: "",
    },
    onSubmit: async (values) => {
      let user;
      const phoneNumber = `+91${values.phoneNumber}`;
      if (!confirmationResult) {
        throw Error("Please send the OTP first");
      }

      // Potential Bug. :what if the user changes his phone number
      // after receiveing the OTP?
      setPaymentProgLoader(true);

      try {
        user = await verifyOTP(phoneNumber, values.otp);
      } catch (err) {
        setPaymentProgLoader(false);
        showAlert(err.message);
        return;
      }

      if (user && user.response && user.response.status === "approved") {
        // Let's create a customer in Firestore
        try {
          setPaymentProgLoader(true);

          const customerCreationRes = await createCustomer(
            {
              ...values,
              otp: undefined,
            },
            eventLink
          );

          if (customerCreationRes.data.customer) {
            // console.log(customerCreationRes.data.customer);
            if (
              trialClass &&
              customerCreationRes.data.customer.events.includes(eventLink)
            ) {
              showAlert(
                "You have already subscribed to this event",
                ALERT_TYPES.ERROR
              );
              setPaymentProgLoader(false);
              return;
            }
            const order = await createOrder({
              order: {
                amount:
                  earlyBird &&
                  parseInt(Date.parse(new Date(earlyBirdDeadline))) > Date.now()
                    ? earlyBirdPrice
                    : price,
                customerId: customerCreationRes.data.customer.customerId,
              },
              eventId: eventLink,
              trialClass,
              type: type,
              slotTime:
                type === EVENT_TYPES.ONE_ON_ONE
                  ? new Date(parseInt(startDate)).toISOString()
                  : "",
            });

            displayRazorpay(
              order.rzpOrderId,
              values,
              customerCreationRes.data.customer.customerId
            );
            setPaymentProgLoader(false);
          }
        } catch (err) {
          setPaymentProgLoader(false);

          if (typeof err === "object") {
            if (err.success === false) {
              showAlert(err.error, ALERT_TYPES.ERROR);
              return;
            }

            if (err.message) {
              showAlert(err.message, ALERT_TYPES.ERROR);
              return;
            }
          }
        }
      } else {
        showAlert("Please enter correct OTP");
      }
      setPaymentProgLoader(false);
    },
  });

  const requestOTP = async () => {
    try {
      if (formik.values.phoneNumber) {
        setDisableOtpButton(true);
        const phoneNumber = `+91${formik.values.phoneNumber}`;
        const response = await sendOTP(phoneNumber, "sms");
        setOtpSent(true);
        showAlert("OTP Sent");
        setConfirmationResult(response);
        setDisableOtpButton(false);
      } else {
        formik.setFieldError("phoneNumber", "Please enter phone number");
      }
    } catch (err) {
      if (err) showAlert(err.message, ALERT_TYPES.ERROR);
    }
  };

  const displayRazorpay = async (orderId, orderData, customerId) => {
    if (trialClass) {
      await submitSuccessOrder({
        razorpayPaymentId: `trial-class-${eventLink}-${customerId}`,
        razorpaySignature: `trial-class-${eventLink}-${customerId}`,
        razorpayOrderId: `trial-class-${eventLink}-${customerId}`,
        eventID: eventLink,
      });

      showAlert(`Your payment id: trial-class-${eventLink}-${customerId}`);
      setOrderId(`trial-class-${eventLink}-${customerId}`);
      setSuccess(true);
      return;
    }

    const res = await loadRazorPay();

    if (!res) {
      showAlert("Are you online?");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_KEY,
      amount:
        earlyBird &&
        parseInt(Date.parse(new Date(earlyBirdDeadline))) > Date.now()
          ? getRzpAmountFormat(earlyBirdPrice)
          : getRzpAmountFormat(price),
      currency: "INR",
      name: orderData.name,
      description: `Payment made for ${eventLink}`,
      order_id: orderId,
      handler: async function (response) {
        showAlert("Don't redirect... Order Booking in progress");

        try {
          await delay(50);
          const res = await submitSuccessOrder({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            razorpayOrderId: response.razorpay_order_id,
          });
          if (res.success) {
            showAlert(`Your payment id: ${response.razorpay_payment_id} `);
            setOrderId(response.razorpay_payment_id);
            setSuccess(true);
          } else {
            throw new Error("Could not make payment");
          }

          await auth.signOut();
        } catch (err) {
          showAlert(
            "Error booking your event. Please contact suport",
            ALERT_TYPES.ERROR
          );

          await auth.signOut();
        }
      },
      prefill: {
        name: orderData.name,
        email: orderData.email,
        contact: orderData.phoneNumber,
        event: eventLink,
      },
      notes: {
        address: "Payorb Corporate Office",
      },
      theme: {
        color: "#BDF5F2",
      },
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", async function (response) {
      showAlert(response.error);
      try {
        const res = await failOrder(response.error.metadata.order_id);

        if (res.success) {
          showAlert(
            `Payment failed. ${response.error.message}`,
            ALERT_TYPES.ERROR
          );
        }
      } catch (err) {
        showAlert(
          "Error booking your event. Please contact suport",
          ALERT_TYPES.ERROR
        );
      }
    });

    rzp1.on("payment.error", async function (response) {
      showAlert("Error processing payment.", ALERT_TYPES.ERROR);
    });

    rzp1.open();
  };

  return (
    <>
      {success ? (
        <PaymentSuccess orderId={orderId} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div id="sign-in-button"></div>
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
              label={"Phone Number"}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      disabled={otpCountDown || disableOtpButton}
                      onClick={requestOTP}
                    >
                      {otpCountDown ? `Retry (${otpCountDown}s)` : "Get OTP"}
                    </Button>
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
              disabled={!otpSent && !confirmationResult}
              fullWidth
              autoComplete={"off"}
            />

            <Grid container style={{ width: "100%" }} justify="center">
              <Grid item xs={1}>
                <Checkbox
                  checked={tAndC}
                  onChange={handleTAndCChange}
                  name=""
                  color="primary"
                />
              </Grid>
              <Grid item xs={11} style={{ paddingLeft: "1em" }}>
                <Typography>
                  I have read and agree to the{" "}
                  <Link
                    target="_blank"
                    href={PAGE_PATHS.POLICY_TERMS_AND_CONDS}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              </Grid>
            </Grid>

            <Tooltip
              title={
                !tAndC
                  ? "Make sure you have agreed to the terms and conditions"
                  : !otpSent && !confirmationResult
                  ? "Make sure you have entered the correct OTP."
                  : ""
              }
            >
              <div style={{ width: "100%" }}>
                <ButtonCapsule
                  showLoader={paymentProgLoader}
                  buttonStyle={classes.paybutton}
                  disabled={(!otpSent && !confirmationResult) || !tAndC}
                  text={
                    earlyBird
                      ? parseInt(Date.parse(new Date(earlyBirdDeadline))) >
                        Date.now()
                        ? `Pay <s>Rs.${price}</s> Rs.${earlyBirdPrice}`
                        : `Pay Rs.${price}`
                      : trialClass
                      ? "Book Now"
                      : `Pay Rs.${price}`
                  }
                  type={"submit"}
                />
              </div>
            </Tooltip>
          </Grid>

          {Alert()}
        </form>
      )}
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
  snackbar: {
    padding: "1em 4em",
    background: "#BDF5F2",
  },
}));

export default EventBookingForm;
