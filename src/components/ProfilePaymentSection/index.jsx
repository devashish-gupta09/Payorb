import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";

import { useFormik } from "formik";
import React from "react";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import Capsule from "../Capsule";

import DashboardCard from "../DashboardCard";

function getPaymentSectionValues(paymentDetails) {
  return {
    name: paymentDetails?.name || "",
    bankName: paymentDetails?.bankName || "",
    accNumber: paymentDetails?.accNumber || "",
    ifscCode: paymentDetails?.ifscCode || "",
    bankAddress: paymentDetails?.bankAddress || "",
  };
}

function getPaymentDetailsStatus(paymentDetails) {
  const classes = styles();
  if (
    !paymentDetails.accNumber ||
    !paymentDetails.ifscCode ||
    !paymentDetails.bankName ||
    !paymentDetails.bankAddress
  ) {
    return (
      <div className={classes.capsule}>
        <Capsule>{"Incomplete"}</Capsule>
      </div>
    );
  } else if (!paymentDetails.rzpLinkedAccId) {
    return (
      <div className={classes.capsule}>
        <Capsule>{"Under Processing"}</Capsule>
      </div>
    );
  }
}

function ProfilePaymentSection({ profileData, updateProfile }) {
  const classes = styles();
  const { Alert, showAlert } = useAlertSnackbar();
  const formik = useFormik({
    initialValues: getPaymentSectionValues(profileData.paymentDetails),
    onSubmit: async (values) => {
      try {
        const res = await updateUser({
          paymentDetails: values,
        });
        if (res?.success) {
          showAlert("Payment Details updated.");
          updateProfile({ ...profileData, paymentDetails: { ...values } });
        } else {
          showAlert("Payment Details not updated.", ALERT_TYPES.ERROR);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const globalClasses = globalStyles();

  return (
    <DashboardCard rootClass={classes.root}>
      {Alert()}
      <Grid
        style={{
          paddingBottom: "2em",
        }}
        container
      >
        <Typography
          className={`${globalClasses.bold} ${classes.sectionTitle}`}
          gutterBottom
        >
          Payment Section
        </Typography>
        {getPaymentDetailsStatus(profileData.paymentDetails)}
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={5}>
          <Grid container item sm={6} spacing={5}>
            <Grid container item sm={6}>
              <TextField
                fullWidth
                className={classes.textInput}
                id="name"
                label="Your Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid container item sm={6}>
              <TextField
                fullWidth
                className={classes.textInput}
                id="bankName"
                label="Bank Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bankName}
                error={
                  formik.touched.bankName && Boolean(formik.errors.bankName)
                }
                helperText={formik.touched.bankName && formik.errors.bankName}
              />
            </Grid>
            <Grid container item sm={6}>
              <TextField
                fullWidth
                className={classes.textInput}
                id="accNumber"
                label="Account Number"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accNumber}
                error={
                  formik.touched.accNumber && Boolean(formik.errors.accNumber)
                }
                helperText={formik.touched.accNumber && formik.errors.accNumber}
              />
            </Grid>
            <Grid container item sm={6}>
              <TextField
                className={classes.textInput}
                id="ifscCode"
                label="IFSC Code"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ifscCode}
                error={
                  formik.touched.ifscCode && Boolean(formik.errors.ifscCode)
                }
                helperText={formik.touched.ifscCode && formik.errors.ifscCode}
              />
            </Grid>
          </Grid>
          <Grid container item sm={6}>
            <TextField
              multiline
              fullWidth
              className={classes.textInput}
              id="bankAddress"
              label="Bank Address"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankAddress}
              error={
                formik.touched.bankAddress && Boolean(formik.errors.bankAddress)
              }
              helperText={
                formik.touched.bankAddress && formik.errors.bankAddress
              }
              rows={6}
            />
          </Grid>
          <Grid
            container
            item
            sm={12}
            justify="center"
            alignItems="center"
            className={classes.saveButtonContainer}
          >
            <ButtonCapsule
              text="Save"
              type="submit"
              buttonStyle={classes.saveButton}
            ></ButtonCapsule>
          </Grid>
        </Grid>
      </form>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
  capsule: {
    marginLeft: "0.3em",
  },
  root: {
    borderRadius: "0.8em",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 1em",
    },
  },
  infoRowRoot: { paddingLeft: "1em", width: "80%" },
  infoRow: {
    padding: "1em 0",
    width: "100%",
    borderBottom: "2px",
    borderColor: "#F2F2F2",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
  },
  reviewTime: {
    color: appColors.grey,
  },

  textInput: {
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  saveButtonContainer: {
    padding: "1.5em",
  },
  saveButton: {
    width: "30%",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sectionTitle: {
    width: "fit-content",
  },
}));

export default ProfilePaymentSection;
