import { CircularProgress, Grid, Typography } from "@material-ui/core";

import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";

import ButtonCapsule from "../ButtonCapsule";

export const HostButtonSection = ({ loader, dateError, formik, classes }) => {
  const {
    verifiedDetails,
    loading: detailsLoading,
    error,
  } = useFetchVendorVerifiedDetails();

  if (detailsLoading) {
    return <CircularProgress size={"2em"} />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (verifiedDetails) {
    const paymentDetails = verifiedDetails.find(
      (vd) => vd.name === "paymentDetails"
    );
    console.log(paymentDetails);

    if (paymentDetails.status !== "COMPLETE") {
      return (
        <Grid container justifyContent="center">
          <Grid item xs={6} style={{ padding: "0.5em" }}>
            <ButtonCapsule
              disabled={loader || dateError || formik.errors.url}
              buttonStyle={classes.draftButton}
              type={"submit"}
              text={"Save Draft"}
              showLoader={loader}
            ></ButtonCapsule>
          </Grid>
          <Grid item xs={6} style={{ padding: "0.5em" }}>
            <ButtonCapsule
              disabled={false}
              buttonStyle={classes.saveButton}
              type={"submit"}
              text={"Host Event"}
              showLoader={loader}
            ></ButtonCapsule>
          </Grid>
        </Grid>
      );
    }

    return (
      <ButtonCapsule
        disabled={loader || dateError || formik.errors.url}
        buttonStyle={classes.saveButton}
        type={"submit"}
        text={"Host Event"}
        showLoader={loader}
      ></ButtonCapsule>
    );
  }
};
