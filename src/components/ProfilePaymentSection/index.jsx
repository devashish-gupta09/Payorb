import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import { useFormik } from "formik";
import React, { useState } from "react";
import useMobileDetect from "use-mobile-detect-hook";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import {
  useUserAuthDetails,
  useFetchUserAuthDetails,
} from "../../context/UserAuthDetailContext";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import Capsule from "../Capsule";

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
  const { dispatch } = useUserAuthDetails();
  const { Alert, showAlert } = useAlertSnackbar();
  const [edit, setEdit] = useState();
  const { isMobile } = useMobileDetect();
  const formik = useFormik({
    initialValues: getPaymentSectionValues(profileData.paymentDetails),
    onSubmit: async (values) => {
      try {
        const res = await updateUser({
          paymentDetails: values,
        });
        if (res?.success) {
          showAlert("Payment Details updated.");
          updateProfile({
            ...profileData,
            paymentDetails: { ...profileData.paymentDetails, ...values },
          });
          await useFetchUserAuthDetails(dispatch);
          setEdit(false);
        } else {
          showAlert("Payment Details not updated.", ALERT_TYPES.ERROR);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleEdit = () => {
    setEdit(!edit);
  };

  const globalClasses = globalStyles();

  return (
    <Grid className={classes.root}>
      {Alert()}
      <Grid container>
        <Typography
          className={`${globalClasses.bold} ${classes.sectionTitle}`}
          gutterBottom
        >
          Payment
        </Typography>
        {getPaymentDetailsStatus(profileData.paymentDetails)}
      </Grid>
      <Grid
        style={{
          padding: "1em 0 2em 0",
        }}
        container
      >
        <Typography variant="p" gutterBottom className={classes.description}>
          Fill this information to get paid for your events and services
        </Typography>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={isMobile() ? 0 : 5}>
          <Grid container item sm={6} spacing={isMobile() ? 0 : 5}>
            <Grid container item sm={6}>
              <TextField
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
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
          <Grid container item sm={6} className={classes.bankAddrContainer}>
            <TextField
              disabled={!edit}
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
            {edit ? (
              <Grid container justify="center" alignItems="center">
                <ButtonCapsule
                  text="Save"
                  type="submit"
                  buttonStyle={classes.saveButton}
                ></ButtonCapsule>
                <Button onClick={handleEdit} className={classes.cancelButton}>
                  Cancel
                </Button>
              </Grid>
            ) : (
              <ButtonCapsule
                buttonStyle={classes.saveButton}
                text="Edit"
                onClick={handleEdit}
              ></ButtonCapsule>
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  capsule: {
    marginLeft: "0.3em",
  },
  root: {
    borderRadius: "0.8em",
    padding: "2em 8em",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 1em",
    },
  },
  description: {
    width: "fit-content",
    background: "rgba(255, 206, 49, 0.17)",
    border: "1px solid rgb(255, 206, 49)",
    padding: "0.5em",
    borderRadius: "5px",
  },
  infoRowRoot: { paddingLeft: "1em", width: "fit-content" },
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
      marginBottom: "1em",
    },
  },
  saveButtonContainer: {
    padding: "2.5em 1em 1em 1em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 2.5em",
    },
  },
  saveButton: {
    width: "20%",
    fontWeight: "bold",
    marginRight: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sectionTitle: {
    width: "fit-content",
  },
  cancelButton: {
    [theme.breakpoints.down("sm")]: {
      margin: "1.5em 0 0.5em 0",
    },
  },
  bankAddrContainer: {
    paddingLeft: "4em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingTop: 0,
    },
  },
}));

export default ProfilePaymentSection;
