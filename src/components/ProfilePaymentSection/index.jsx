import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
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

const fetchIFSCDetails = async (ifsc) => {
  return (await axios.get(`https://ifsc.razorpay.com/${ifsc}`))?.data;
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
    () => fetchIFSCDetails(formik.values.ifscCode),
    { enabled: enabled, cacheTime: 0, retry: 0 }
  );

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

  const handleIFSCChange = (event) => {
    setEnabled(false);
    formik.setFieldValue("ifscCode", event.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
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
                    onChange={formik.handleChange}
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
                      formik.touched.ifscCode && Boolean(formik.errors.ifscCode)
                    }
                    helperText={
                      formik.touched.ifscCode && formik.errors.ifscCode
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
            ) : bankDataFetchError && formik.values.ifscCode ? (
              <span>{JSON.stringify(bankDataFetchError)}</span>
            ) : bankDetails ? (
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
    marginBottom: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "1em",
    },
  },
  saveButtonContainer: {
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 2.5em",
    },
  },
  saveButton: {
    // width: "20%",
    fontWeight: "bold",
    padding: "0.75em 2.5em",
    marginRight: "1 em",
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
  detailRowContainer: {
    paddingBottom: "0.5em",
  },
  detailRowTitle: {
    color: "#8B8B8B",
    paddingBottom: "0",
    fontWeight: "300",
  },
}));

export default ProfilePaymentSection;
