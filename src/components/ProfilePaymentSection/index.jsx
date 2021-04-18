import {
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DashboardCard from "../DashboardCard";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import { appColors } from "../../../styles/colors";
import { useFormik } from "formik";
import ButtonCapsule from "../ButtonCapsule";

function getPaymentSectionValues(paymentDetails) {
  return {
    name: paymentDetails?.name || "",
    bankName: paymentDetails?.bankName || "",
    accNumber: paymentDetails?.accNumber || "",
    IFSCCode: paymentDetails?.IFSCCode || "",
    bankAddress: paymentDetails?.bankAddress || "",
  };
}

function ProfilePaymentSection({ profileData }) {
  const classes = styles();
  const formik = useFormik({
    initialValues: getPaymentSectionValues(profileData.paymentDetails),
    onSubmit: () => {
      console.log("Received Some values to update payment details");
    },
  });

  const globalClasses = globalStyles();

  return (
    <DashboardCard rootClass={classes.root}>
      <Typography className={`${globalClasses.bold} ${classes.sectionTitle}`}>
        Payment Section
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={5}>
          <Grid container item sm={6} spacing={5}>
            <Grid container item sm={6}>
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
              />
            </Grid>
            <Grid container item sm={6}>
              <TextField
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
                id="IFSCCode"
                label="IFSC Code"
                variant="outlined"
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
            sm={12}
            justify="center"
            alignItems="center"
            className={classes.saveButtonContainer}
          >
            <ButtonCapsule
              text="Save"
              buttonStyle={classes.saveButton}
            ></ButtonCapsule>
          </Grid>
        </Grid>
      </form>
    </DashboardCard>
  );
}

const styles = makeStyles((theme) => ({
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
  sectionTitle: {
    paddingBottom: "2em",
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
}));

export default ProfilePaymentSection;
