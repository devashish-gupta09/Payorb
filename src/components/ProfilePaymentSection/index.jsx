import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import useMobileDetect from "use-mobile-detect-hook";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import {
  useUserAuthDetails,
  useFetchUserAuthDetails,
} from "../../context/UserAuthDetailContext";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import { paymentSectionValidation } from "../../validations/paymentSection";
import ButtonCapsule from "../ButtonCapsule";
import Capsule from "../Capsule";
import { styles } from "./styles";

function getPaymentSectionValues(paymentDetails) {
  return {
    name: paymentDetails?.name || "",
    bankName: paymentDetails?.bankName || "",
    accNumber: paymentDetails?.accNumber || "",
    ifscCode: paymentDetails?.ifscCode || "",
    bankAddress: paymentDetails?.bankAddress || "",
    confirmAccNumber: "",
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

const fetchIFSCDetails = async (ifsc, formik) => {
  const res = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
  return res?.data;
};

function ProfilePaymentSection({ profileData, updateProfile }) {
  const classes = styles();
  const { dispatch } = useUserAuthDetails();
  const { Alert, showAlert } = useAlertSnackbar();
  const [edit, setEdit] = useState();
  const { isMobile } = useMobileDetect();

  const [enabled, setEnabled] = useState(false);
  const {
    data: bankDetails,
    isLoading: bankDataLoading,
    error: bankDataFetchError,
  } = useQuery(
    "fetch-ifsc-details",
    () => fetchIFSCDetails(formik.values.ifscCode, formik),
    { enabled: enabled, cacheTime: 0, retry: 0 }
  );

  const formik = useFormik({
    initialValues: getPaymentSectionValues(profileData.paymentDetails),
    validationSchema: paymentSectionValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        console.log("IN OAYMENT");
        try {
          await fetchIFSCDetails(values.ifscCode);
        } catch (err) {
          showAlert(
            "IFSC Code not correct. Click on Fetch Details",
            ALERT_TYPES.ERROR
          );
          return;
        }

        const res = await updateUser({
          paymentDetails: {
            name: values.name,
            accNumber: values.accNumber,
            ifscCode: values.ifscCode,
            bankAddress: bankDetails.ADDRESS,
            bankName: bankDetails.BANK,
          },
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

  const handleIFSCChange = (event) => {
    setEnabled(false);
    formik.setFieldValue("ifscCode", event.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleAccountNumberChange = (inputEvent) => {
    formik.handleChange(inputEvent);
    formik.setFieldValue("confirmAccNumber", "");
  };

  const globalClasses = globalStyles();

  return (
    <Grid className={classes.root}>
      {Alert()}
      <Grid container>
        <Typography
          variant="h6"
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
        <Grid container>
          <Grid container item sm={7}>
            <Grid style={{ padding: "2em" }}>
              <Grid
                container
                item
                sm={12}
                style={{
                  padding: "2em 15% 2em 15%",
                  boxShadow: "0 0 5px 0px rgba(0,0,0,0.25)",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  style={{
                    paddingBottom: "2em",
                    fontSize: "1.25em",
                    fontWeight: "600",
                  }}
                >
                  Bank Account Details
                </Typography>
                <Grid container item sm={12}>
                  <TextField
                    disabled={!edit}
                    fullWidth
                    className={classes.textInput}
                    id="name"
                    label="Full Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid container item sm={12}>
                  <TextField
                    fullWidth
                    disabled={!edit}
                    className={classes.textInput}
                    id="accNumber"
                    label="Account Number"
                    variant="outlined"
                    onChange={handleAccountNumberChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.accNumber}
                    error={
                      formik.touched.accNumber &&
                      Boolean(formik.errors.accNumber)
                    }
                    helperText={
                      formik.touched.accNumber && formik.errors.accNumber
                    }
                  />
                </Grid>

                {edit ? (
                  <Grid container item sm={12}>
                    <TextField
                      fullWidth
                      disabled={
                        formik.values.accNumber ===
                        formik.values.confirmAccNumber
                      }
                      className={classes.textInput}
                      id="confirmAccNumber"
                      label="Confirm Account Number"
                      variant="outlined"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmAccNumber}
                      error={
                        formik.touched.confirmAccNumber &&
                        Boolean(formik.errors.confirmAccNumber)
                      }
                      helperText={
                        formik.touched.confirmAccNumber &&
                        formik.errors.confirmAccNumber
                      }
                    />
                  </Grid>
                ) : null}

                <Grid container item sm={12}>
                  <TextField
                    disabled={!edit}
                    className={classes.textInput}
                    id="ifscCode"
                    label="IFSC Code"
                    variant="outlined"
                    fullWidth
                    onChange={handleIFSCChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ifscCode}
                    error={
                      bankDataFetchError ??
                      (formik.touched.ifscCode &&
                        Boolean(formik.errors.ifscCode))
                    }
                    helperText={
                      (bankDataFetchError && "IFSC code incorrect") ||
                      (formik.touched.ifscCode && formik.errors.ifscCode)
                    }
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
                  <Grid style={{ paddingRight: "0.5em" }}>
                    <ButtonCapsule
                      text={"Fetch details"}
                      onClick={() => setEnabled(!enabled)}
                    ></ButtonCapsule>
                  </Grid>

                  {edit ? (
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ width: "fit-content" }}
                    >
                      <ButtonCapsule
                        text="Save"
                        type="submit"
                        disabled={
                          formik.errors.ifscCode ?? bankDataFetchError
                            ? true
                            : bankDetails
                            ? false
                            : true
                        }
                        buttonStyle={classes.saveButton}
                      ></ButtonCapsule>
                      <Button
                        onClick={handleEdit}
                        className={classes.cancelButton}
                      >
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
            </Grid>
          </Grid>
          <Grid item sm={5} style={{ padding: "4em 2em 2em 2em" }}>
            {bankDataLoading ? (
              <CircularProgress />
            ) : bankDataFetchError &&
              formik.values.ifscCode ? null : bankDetails ? (
              <Grid
                style={{
                  background: "#FFFAEB",
                  borderRadius: "8px",
                  padding: "0.75em",
                }}
              >
                <Typography
                  style={{
                    paddingBottom: "1em",
                    fontSize: "1.25em",
                    fontWeight: "600",
                  }}
                >
                  Account Holder Details
                </Typography>
                <Grid style={{ paddingBottom: "0.5em" }}>
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      paddingBottom: "0",
                      fontWeight: "300",
                    }}
                    variant="subtitle2"
                  >
                    Full name
                  </Typography>
                  <Typography style={{ color: "#000000 " }} variant="body1">
                    {formik.values.name}
                  </Typography>
                </Grid>
                <Grid style={{ paddingBottom: "0.5em" }}>
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      paddingBottom: "0",
                      fontWeight: "300",
                    }}
                    variant="subtitle2"
                  >
                    Bank Name
                  </Typography>
                  <Typography style={{ color: "#000000 " }} variant="body1">
                    {bankDetails.BANK}
                  </Typography>
                </Grid>
                <Grid style={{ paddingBottom: "0.5em" }}>
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      paddingBottom: "0",
                      fontWeight: "300",
                    }}
                    variant="subtitle2"
                  >
                    Account Number
                  </Typography>
                  <Typography style={{ color: "#000000 " }} variant="body1">
                    {formik.values.accNumber}
                  </Typography>
                </Grid>
                <Grid style={{ paddingBottom: "0.5em" }}>
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      paddingBottom: "0",
                      fontWeight: "300",
                    }}
                    variant="subtitle2"
                  >
                    IFSC Code
                  </Typography>
                  <Typography style={{ color: "#000000 " }} variant="body1">
                    {bankDetails.IFSC}
                  </Typography>
                </Grid>
                <Grid style={{ paddingBottom: "0.5em" }}>
                  <Typography
                    style={{
                      color: "#8B8B8B",
                      paddingBottom: "0",
                      fontWeight: "300",
                    }}
                    variant="subtitle2"
                  >
                    Branch Address
                  </Typography>
                  <Typography style={{ color: "#000000 " }} variant="body1">
                    {bankDetails.ADDRESS}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ProfilePaymentSection;
