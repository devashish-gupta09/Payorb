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
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";

import { createCustomer } from "../../services/customers";
import {
  createOrder,
  failOrder,
  submitSuccessOrder,
} from "../../services/orders";
import { delay } from "../../utils/dateTime";
import app from "../../utils/firebase";
import { getRzpAmountFormat } from "../../utils/payments";
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
  eventLink,
  price,
  type,
  oneOnOneBooking: { startDate },
}) {
  const [otpSent, setOtpSent] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState();

  const { Alert, showAlert } = useAlertSnackbar();
  const [success, setSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [paymentProgLoader, setPaymentProgLoader] = React.useState(false);

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

      if (!confirmationResult) {
        throw Error("Please send the OTP first");
      }

      // Potential Bug. :what if the user changes his phone number
      // after receiveing the OTP?
      setPaymentProgLoader(true);

      user = await confirmationResult.confirm(values.otp);

      if (user) {
        // Let's create a customer in Firestore
        try {
          setPaymentProgLoader(true);

          const customerCreationRes = await createCustomer({
            ...values,
            otp: undefined,
          });

          if (customerCreationRes.data.customer) {
            const order = await createOrder({
              order: {
                amount: price,
                customerId: customerCreationRes.data.customer.customerId,
              },
              eventId: eventLink,
              type: type,
              slotTime: new Date(parseInt(startDate)).toISOString(),
            });

            displayRazorpay(order.rzpOrderId, values);
            setPaymentProgLoader(false);
          }
        } catch (err) {
          setPaymentProgLoader(false);

          if (typeof err === "object") {
            if (err.success === false) {
              showAlert(err.error || err.message, ALERT_TYPES.ERROR);
              return;
            }
          }
        }
      }
      setPaymentProgLoader(false);
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

        setOtpSent(true);
        showAlert("OTP Sent");
        setConfirmationResult(response);
      } else {
        formik.setFieldError("phoneNumber", "Please enter phone number");
      }
    } catch (err) {
      showAlert(err.error || err.message, ALERT_TYPES.ERROR);
    }
  };

  const displayRazorpay = async (orderId, orderData) => {
    const res = await loadRazorPay();

    if (!res) {
      alert("Are you online?");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_KEY,
      amount: getRzpAmountFormat(price),
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

          console.log(res);
          if (res.success) {
            showAlert(`Your order id: ${response.razorpay_order_id} `);
            setOrderId(response.razorpay_order_id);
            setSuccess(true);
          } else {
            throw new Error("Could not make payment");
          }
        } catch (err) {
          showAlert(
            "Error booking your event. Please contact suport",
            ALERT_TYPES.ERROR
          );
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
      try {
        const res = await failOrder(response.error.metadata.order_id);

        if (res.success) {
          showAlert("ayment failed.", ALERT_TYPES.ERROR);
        }
      } catch (err) {
        showAlert(
          "Error booking your event. Please contact suport",
          ALERT_TYPES.ERROR
        );
      }
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
              disabled={!otpSent && !confirmationResult}
              fullWidth
              autoComplete={"off"}
            />
            <ButtonCapsule
              showLoader={paymentProgLoader}
              buttonStyle={classes.paybutton}
              disabled={!otpSent && !confirmationResult}
              text={`Pay Rs.${price}`}
              type={"submit"}
            />
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
